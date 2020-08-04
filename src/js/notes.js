fetch('https://api.github.com/users/hacktivist123/repos')
    .then(response => response.json())
    .then(data => console.log(data));
