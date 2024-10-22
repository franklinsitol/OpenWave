const postButton = document.getElementById('postButton');
const postsDiv = document.getElementById('posts');
const newPostText = document.getElementById('newPost');
const fileInput = document.getElementById('fileInput');

let posts = [];

// Function to load posts
function loadPosts() {
  fetch('https://script.google.com/macros/s/AKfycbwAcrBWl29WaVvjNC-7_WlImobENMWSCgrjGmPjvnu8PzU1VOvbZWl455rnA5TdApqO/exec')
    .then(response => response.json())
    .then(data => {
      posts = data.posts;
      renderPosts();
    });
}

// Function to render posts
function renderPosts() {
  postsDiv.innerHTML = '';
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
      <p>${post.username}</p>
      <p>${post.text}</p>
      ${post.media ? `<img src="${post.media}" alt="Media">` : ''}
      <p>Time Left: ${post.timeLeft}h</p>
      <button>Aplaudir</button>
    `;
    postsDiv.appendChild(postDiv);
  });
}

// Function to post new content
postButton.addEventListener('click', () => {
  const text = newPostText.value;
  const file = fileInput.files[0];

  if (text || file) {
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }
    fetch('https://script.google.com/macros/s/AKfycbwAcrBWl29WaVvjNC-7_WlImobENMWSCgrjGmPjvnu8PzU1VOvbZWl455rnA5TdApqO/exec', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
      .then(data => {
        newPostText.value = '';
        fileInput.value = '';
        loadPosts();
      });
  }
});

// Load posts on page load
loadPosts();
