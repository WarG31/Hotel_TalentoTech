document.addEventListener('DOMContentLoaded', () => {


  
  
  
  // Manejar la reservación
  document.getElementById('reservationBtn').addEventListener('click', function(){
    const room_type = document.getElementById('roomType').value;
    

    fetch('http://localhost:3006/users/reservar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({room_type})
    })
    .then(response=>response.json())
    .then(data =>alert(data.message))
    .catch(error => console.error('Error',error));
  });


  //Cierre sesión

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      fetch('http://localhost:3006/users/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          window.location.href = '/views/index.html';
        });
    });
  }

  const welcomeUser = document.getElementById('welcomeUser');


  const storedFirts_name = localStorage.getItem('first_name');
  const storedLast_name = localStorage.getItem('last_name');

  if (storedFirts_name && storedLast_name) {
    welcomeUser.textContent = storedFirts_name + " " + storedLast_name;

  }
  // const storedemail_email = localStorage.getItem('email');
  // console.log("email guardado:",storedemail_email)



  //////////////Mostrar habitaciones////////////////////////////

  const habitacionesLista = document.getElementById("habitacionesLista");
  const lit = document.getElementById("lit");

  const obtenerHabitaciones = () => {
    //Obtenemos elementos li del listado de habitaciones
    let elemento = habitacionesLista.querySelector("li");
    //Mientras exista elementos hijos
    while(elemento !== null){
        //Se elimina el elemento hijo
        habitacionesLista.removeChild(elemento);
        //Se consulta si hay mas elementos hijos li
        elemento = habitacionesLista.querySelector("li");
    }

    //Se consume endpoint para obtener todos los habitaciones
    fetch("http://localhost:3006/users/habitaciones")
    .then(response => response.json())
    .then(habitaciones => {
        //Por cada habitación devuelto
        habitaciones.forEach(habitacion => {
            //Se crea un elemento li
            const li = document.createElement("li");
            //Se le asigna texto al elemento
            li.textContent = `Habitación: - ID: ${habitacion.room_id} - Tipo: ${habitacion.room_type} - Estado: ${habitacion.status}`;
            //Se agrega como hijo del listado de vehiculoss
            habitacionesLista.appendChild(li);
            if(habitacion.status == 'ocupada'){
              li.style.backgroundColor = '#bfc9ca';
              li.style.color = 'red';
             

            }



        });
    })
};
//Se ejecuta la obtención de vehiculos
obtenerHabitaciones();
//Se configura la ejecución del método de obtener vehiculos cada 5 segundos (5000ms)
setInterval(obtenerHabitaciones, 5000);

///////////////////////////////////////////////////////////
  

});