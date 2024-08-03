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
      document.querySelector('#menu-container').innerHTML = template({ posts: postsData })
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }

  // Створення нового поста
//   async function createPost(title, content) {
//     try {
//     } catch (error) {
//       console.error(error);
//     }
//   }

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
