let postsData = [];
let template;

document.addEventListener('DOMContentLoaded', async function () {
  // Отримання списку постів
  async function getPosts() {
    try {
      const response = await fetch('/db.json');

      if (!response.ok) {
        throw new Error('Network Error Response Identified');
      }

      const data = await response.json();
      postsData = data.posts;

      const source = document.querySelector('#menu-template').innerHTML;
      template = Handlebars.compile(source);
      document.querySelector('#menu-container').innerHTML = template({ posts: postsData });
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }
  document.getElementById('create-post-form').addEventListener('submit', createPost);

  // Створення нового поста
  async function createPost(title, content) {
    title = document.getElementById('title-input').value;
    content = document.getElementById('content-input').value;

     const newPost = {
      id: (Math.random() * 10000).toFixed(0),
      title: title,
      views: 0,
      content: content,
    };
    try {
      const postResponse = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        throw new Error('Failed to add post to database', errorText);
      }

      alert('Post added successfully');
      document.getElementById('titleInput').value = '';
      document.getElementById('contentInput').value = '';

      const updatedResponse = await fetch('/db.json');
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated data');
      }
      const updatedData = await updatedResponse.json();
      postsData = updatedData.posts;
    } catch (error) {
      console.log('Error adding post to database', error);
    }
  }

  // Оновлення поста
  //   async function updatePost(id, title, content) {
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  // Видалення поста
  //   async function deletePost(id) {
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   // Додавання коментаря до поста
  //   async function createComment(postId, comment) {
  //     try {
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  // Оновлення відображення постів на сторінці
  function renderPosts(posts) {
    getPosts(posts);
  }

  // Обробник події для створення поста
  //   document.getElementById('create-post-form').addEventListener('submit', cb);

  //   // Обробник події для редагування поста
  //   document.addEventListener('click', cb);

  //   // Обробник події для видалення поста
  //   document.addEventListener('click', cb);

  //   // Обробник події для додавання коментаря
  //   document.addEventListener('submit', cb);

  // Запуск додатку
  async function startApp() {
    renderPosts();
  }

  startApp();
});
