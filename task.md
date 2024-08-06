Створіть веб-додаток блогу, який дозволяє користувачам створювати, переглядати, оновлювати та видаляти пости. 
Інструкції:
1. Використовуйте Node.js для створення сервера.
2. Використовуйте json-server для створення серверу та обробки запитів.
3. Використовуйте пакетний менеджер npm для управління залежностями та інсталяції необхідних пакетів. Для збирання проєкту ініціалізуйте новий проєкт та встановіть Parcel.
4. Використовуйте шаблонізатор Handlebars для відображення сторінок блогу.
5. Використовуйте bd.json для зберігання даних про пости та коментарі.
6. Реалізуйте механізм пагінації для перегляду списку постів. Рекомендується використати будь яку бібліотеку.
7. Застосуйте асинхронні функції та async/await та try…catch для обробки асинхронних операцій, таких як завантаження та збереження даних. 
8. Використовуйте REST API для взаємодії з бекендом та виконання CRUD-операцій.
9. Застосуйте AJAX для асинхронного завантаження даних без перезавантаження сторінки.
10. Забезпечте можливість користувачам додавати, оновлювати та видаляти свої пости.
11. Додайте можливість коментувати пости та відображати коментарі на сторінці поста.
12. Додайте функцію пошуку для знаходження постів за ключовими словами.
Весь функціонал додатку повинен бути реалізований в одно чи багатосторінковому форматі, який буде відповідати за відображення сторінок блогу, обробку запитів та взаємодію з даними. Ви можете використовувати форми та кнопки для взаємодії з додатком, а також використовувати будь які бібліотеки для стилізаціїї чи забезпечення функціоналу додатку.
За основу можна використати код нижче.
Обов’язковою умовою є використання модульності коду.




<!DOCTYPE html>
<html>
<head>
  <title>Блог</title>
 </head>
<body>
  <h1>Блог</h1>


  <form id="createPostForm">
    <input type="text" id="titleInput" placeholder="Заголовок" required>
    <textarea id="contentInput" placeholder="Зміст" required></textarea>
    <button type="submit">Створити пост</button>
  </form>


  <div id="postsContainer"></div>
 </body>
</html>




  ШАБЛОН
 <div class="post">
      <h2></h2>
      <p></p>
      <button class="editPostButton" data-id="">Редагувати</button>
      <button class="deletePostButton" data-id="">Видалити</button>
      <div class="commentsContainer" data-id="">
        <h3>Коментарі:</h3>
        <ul>
            <li></li>
        </ul>
        <form class="createCommentForm">
          <input type="text" class="commentInput" placeholder="Новий коментар" required>
          <button type="submit">Додати коментар</button>
        </form>
      </div>
    </div>
  


  
    // Отримання списку постів
    async function getPosts() {
      try {
            } catch (error) {
        console.error(error);
      }
    }


    // Створення нового поста
    async function createPost(title, content) {
      try {
            } catch (error) {
        console.error(error);
      }
    }


    // Оновлення поста
    async function updatePost(id, title, content) {
      try {
             } catch (error) {
        console.error(error);
      }
    }


    // Видалення поста
    async function deletePost(id) {
      try {
             } catch (error) {
        console.error(error);
      }
    }


    // Додавання коментаря до поста
    async function createComment(postId, comment) {
      try {
             
      } catch (error) {
        console.error(error);
      }
    }


    // Оновлення відображення постів на сторінці
    function renderPosts(posts) {
        }


    // Обробник події для створення поста
    document.getElementById('createPostForm').addEventListener('submit', cb);


    // Обробник події для редагування поста
    document.addEventListener('click', cb);


    // Обробник події для видалення поста
    document.addEventListener('click', cb);


    // Обробник події для додавання коментаря
    document.addEventListener('submit', cb);


    // Запуск додатку
    async function startApp() {
      const posts = await getPosts();
      renderPosts(posts);
    }


    startApp();
 






