function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    google.script.run.withSuccessHandler(function(response) {
        if (response.success) {
            window.location.href = "feed.html";
        } else {
            document.getElementById('error').innerText = "Invalid login.";
        }
    }).authenticateUser(username, password);
}

function loadFeed() {
    google.script.run.withSuccessHandler(function(posts) {
        var feedContainer = document.getElementById('feed');
        feedContainer.innerHTML = '';  // Limpar o feed
        
        posts.forEach(function(post) {
            var postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `<p>${post.username}</p><p>${post.content}</p><p>${post.timestamp}</p>`;
            feedContainer.appendChild(postElement);
        });
    }).getPosts();
}

function createPost() {
    var content = prompt("Enter your post content:");
    var media_url = "";  // Código para upload de mídia aqui

    google.script.run.withSuccessHandler(function(response) {
        if (response.success) {
            alert("Post created!");
            loadFeed();  // Recarrega o feed
        }
    }).createPost(USER_ID, content, media_url);
}
