let postsData = [];
let template;
let currentPage = 1;
const postsPerPage = 3;

document.addEventListener('DOMContentLoaded', async function () {
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
      pagination();
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }
  document.getElementById('create-post-form').addEventListener('submit', createPost);
  document.getElementById('prev-page').addEventListener('click', showPreviousPage);
  document.getElementById('next-page').addEventListener('click', showNextPage);

  function pagination() {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = postsData.slice(start, end);

    const paginatedData = { posts: paginatedPosts, comments: [], profile: {} };
    document.querySelector('#menu-container').innerHTML = template(paginatedData);

    setUpdateListeners();
    updatePageInfo();
    setDeleteButtonListeners();
    setCommentListeners()
  }

  function updatePageInfo() {
    const pageInfo = document.getElementById('page-info');
    const totalPages = Math.ceil(postsData.length / postsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  function showPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      pagination();
    }
  }

  function showNextPage() {
    const totalPages = Math.ceil(postsData.length / postsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      pagination();
    }
  }

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
      currentPage = 1; // Reset to first page after adding a new post
      pagination();
    } catch (error) {
      console.log('Error adding post to database', error);
    }
  }

  function setUpdateListeners() {
    const menuItemLiElements = document.querySelectorAll('.edit-post-button');

    menuItemLiElements.forEach((item) => {
      item.addEventListener('click', updatePost);
    });
  }

  async function updatePost(id, title, content) {
    id = event.target.getAttribute('data-id');
    if (!id) {
      console.error('No post ID found');
      return;
    }
    try {
      const response = await fetch(`/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from db.json');
      }
      const post = await response.json();

      title = prompt('Enter the new title', post.title);
      content = prompt('Enter the new content', post.content);

      const updatedPost = {
        id: id,
        title: title,
        content: content,
      };

      const updateResponse = await fetch(`/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update post: ${errorText}`);
      }

      alert('Post updated successfully');

      const updatedPostsResponse = await fetch('/db.json');
      if (!updatedPostsResponse.ok) {
        throw new Error('Failed to fetch updated data');
      }
      const updatedData = await updatedPostsResponse.json();
      postsData = updatedData.posts;
      pagination();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  function setDeleteButtonListeners() {
    const deletePostButtons = document.querySelectorAll('.delete-post-buton');

    deletePostButtons.forEach((button) => {
      button.addEventListener('click', deletePost);
    });
  }

  async function deletePost(id) {
    id = event.target.getAttribute('data-id');
    try {
      const deleteResponse = await fetch(`/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error(`Failed to delete post: ${errorText}`);
      }

      alert('Post deleted successfully');

      const updatedResponse = await fetch('/db.json');
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch deleted data');
      }
      const updatedData = await updatedResponse.json();
      postsData = updatedData.posts;
      pagination();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  function setCommentListeners() {
    const addCommentButtons = document.querySelectorAll('.add-comment');

    addCommentButtons.forEach((button) => {
      button.addEventListener('click', (event) =>
        createComment(event, button.getAttribute('data-id'))
      );
    });
  }

  //   // Додавання коментаря до поста
  async function createComment(event,postId) {
    event.preventDefault(); // Prevent form submission

    // Get the comment input field for the specific post
    const commentInputElement = event.target
      .closest('.create-comment-form')
      .querySelector('.comment-input');
    const commentTitle = commentInputElement.value.trim();

    if (!commentTitle) {
      console.log('Comment input is empty.');
      return;
    }

    const newComment = {
      content: commentTitle,
    };

    try {
      const postResponse = await fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        throw new Error(`Failed to add comment to database: ${errorText}`);
      }

      alert('Comment added successfully');
      commentInputElement.value = ''; // Reset the input field

      const updatedResponse = await fetch('/db.json');
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch commented data');
      }

      const updatedData = await updatedResponse.json();
      postsData = updatedData.posts;
      currentPage = 1; // Reset to first page after adding a new post
      pagination();

      // Update the comments section of the specific post
      const commentsContainer = document.querySelector(
        `.comments-container[data-id="${postId}"] ul`
      );
      const newCommentElement = document.createElement('li');
      newCommentElement.textContent = newComment.content;
      commentsContainer.appendChild(newCommentElement);
    } catch (error) {
      console.log('Error adding comment to database', error);
    }
  }

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
