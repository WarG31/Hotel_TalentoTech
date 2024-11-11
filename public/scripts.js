document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  const message = document.getElementById('message');



  // Manejar el registro de usuario
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const first_name = document.getElementById('first_name').value;
      const last_name = document.getElementById('last_name').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const role = document.getElementById('role').value;

      fetch('http://localhost:3006/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name, password, email, phone, role })
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message)
          message.textContent = data.message || data.error;
        })
        .catch(error => {
          message.textContent = 'Error de servidor';
        });
    });
  }



  // Manejar inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      fetch('http://localhost:3006/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.role === 'admin') {
            window.location.href = '/views/adminMenu.html';
          } else if (data.role === 'user') {
            // window.location.href = '/views/userPage.html';
            // message.textContent = data.name;

            // console.log( req.session.user_id)

            localStorage.setItem('first_name', data.first_name);
            localStorage.setItem('last_name', data.last_name);
            localStorage.setItem('email', data.email);
            setTimeout(() => {
              window.location.href = '/views/userPage.html';
            }, 500);

          } else {
            alert(data.error || 'Error de autenticación')
            // message.textContent = data.error || 'Error de autenticación';
          }
        })
        .catch(error => {
          message.textContent = 'Error de servidor';
        });
    });


  }



  // const welcomeUser = document.getElementById('welcomeUser');


  // const storedFirts_name = localStorage.getItem('first_name');
  // const storedLast_name = localStorage.getItem('last_name');

  // console.log(storedFirts_name);
  // if (storedFirts_name && storedLast_name) {
  //   welcomeUser.textContent = storedFirts_name + " " + storedLast_name;

  // }



});


