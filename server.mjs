import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname), 'public', 'index.html');
});

app.get('/posts', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, data) => {
    if (err) {
      console.error('Error reading database file', err);
      res.status(500).send('Error reading database file');
      return;
    }

    const db = JSON.parse(data);
    res.status(200).send(db.posts);
  });
});

app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      res.status(500).send('Error reading database file');
      return;
    }
    const db = JSON.parse(data);
    const post = db.posts.find((p) => p.id === postId);
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    res.status(200).send(post);
  });
});

app.post('/posts', (req, res) => {
  const newPost = req.body;
  fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, data) => {
    if (err) {
      console.log('Error reading database file:', err);
      res.status(500).send('Error reading database file');
      return;
    }
    const db = JSON.parse(data);
    db.posts.push(newPost);
    fs.writeFile(path.join(__dirname, 'public', 'db.json'), JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error('Error writing to database file:', err);
        res.status(500).send('Error reading database file');
        return;
      }
      res.status(201).send('Post added successfully');
    });
  });
});

app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPostData = req.body;

  fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      res.status(500).send('Error reading database file');
      return;
    }

    const db = JSON.parse(data);
    const postIndex = db.posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      res.status(404).send('Post not found');
      return;
    }

    // Update the post
    db.posts[postIndex] = { ...db.posts[postIndex], ...updatedPostData };

    // Write the updated database back to the file
    fs.writeFile(
      path.join(__dirname, 'public', 'db.json'),
      JSON.stringify(db, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing to database file:', err);
          res.status(500).send('Error writing to database file');
          return;
        }

        res.status(200).send('Post updated successfully');
      }
    );
  });
});

app.delete('/posts/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }
    const db = JSON.parse(data);
    db.posts = db.posts.filter((post) => post.id != req.params.id);
    fs.writeFile(path.join(__dirname, 'public', 'db.json'), JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Error writing file');
        return;
      }
      res.status(200).send('Post deleted');
    });
  });
});

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const newComment = req.body.content;

  fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      res.status(500).send('Error reading database file');
      return;
    }

    const db = JSON.parse(data);
    const post = db.posts.find((p) => p.id === postId);

    if (!post) {
      res.status(404).send({ error: 'Post not found' });
      return;
    }

    post.comments.push(newComment);

    fs.writeFile(
      path.join(__dirname, 'public', 'db.json'),
      JSON.stringify(db, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing to database file:', err);
          res.status(500).send('Error writing to database file');
          return;
        }

        res.status(200).send('Comment added successfully');
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
