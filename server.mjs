import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname), 'public', 'index.html')
});

app.get('./posts', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, data) => {
        if(err) {
            console.log('Error reading database file', err);
            res.status(500).send('Error reading database file');
            return;
        }

        const db = JSON.parse(data);
        res.status(200).send(db.posts);
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})