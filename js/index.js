document.getElementById('github-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('search').value;
    searchGitHub(username);
  });
  
  function searchGitHub(username) {
    const userEndpoint = `https://api.github.com/search/users?q=${username}`;
    fetch(userEndpoint, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => {
      console.error('Error searching GitHub:', error);
    });
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    // Clear previous results
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}"> ${user.login}`;
      listItem.addEventListener('click', function() {
        getUserRepos(user.login);
      });
      userList.appendChild(listItem);
    });
  }
  
  function getUserRepos(username) {
    const reposEndpoint = `https://api.github.com/users/${username}/repos`;
    fetch(reposEndpoint, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(repos => {
      displayRepos(repos);
    })
    .catch(error => {
      console.error(`Error fetching repositories for ${username}:`, error);
    });
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results
    repos.forEach(repo => {
      const listItem = document.createElement('li');
      listItem.textContent = repo.name;
      reposList.appendChild(listItem);
    });
  }
  