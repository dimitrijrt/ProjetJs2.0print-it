const form = document.querySelector("form");


form.addEventListener("submit", async (e) => {
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    // POST REQUEST
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    window.localStorage.setItem('accessToken', result.token);
    window.location.href = './index.html';
});