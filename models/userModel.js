const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel_db'
});

// Función para verificar si un correo ya existe
const checkEmailExists = (email, callback) => {
    const query = 'SELECT email FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error en checkEmailExists:', error);
            return callback(error);
        }
        return callback(null, results.length > 0); // true si el correo existe
    });
};

// Función para registrar un nuevo usuario
const registerUser = (first_name, last_name, password, email, phone, role, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error en el hash de la contraseña:', err);
            return callback(err);
        }

        connection.query(
            'INSERT INTO users (first_name, last_name, password, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, hash, email, phone, role],
            (error, result) => {
                if (error) {
                    console.error('Error en registerUser:', error);
                    return callback(error);
                }
                callback(null, result);
            }
        );
    });
};


// Función para verificar email y contraseña
const authenticateUser = (email, password, callback) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) return callback(error, null);
      if (results.length === 0) return callback(null, null);
  
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return callback(err, null);
        if (isMatch) {
          callback(null, { user_id: user.user_id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role });
        } else {
          callback(null, null);
        }
      });
    });
  };



  //funcion para reservar habitación

  const bookingRoom = (room_type, callback) => {
    console.log('Reservar habitación de tipo:', room_type); // Añadir logs para verificar los datos

    // Primero, seleccionamos la habitación disponible
    const selectQuery = 'SELECT * FROM habitaciones WHERE room_type = ? AND status = "disponible" ORDER BY room_id LIMIT 1';
    connection.query(selectQuery, [room_type], (error, results) => {
        if (error) {
            console.error('Error en bookingRoom (SELECT):', error); // Añadir logs para debugging
            return callback(error);
        }

        if (results.length === 0) {
            return callback(null, { affectedRows: 0 }); // No hay habitaciones disponibles
        }

        // Luego, actualizamos el estado de la habitación seleccionada
        const roomId = results[0].room_id;
        const updateQuery = 'UPDATE habitaciones SET status = "ocupada" WHERE room_id = ?';
        connection.query(updateQuery, [roomId], (error, results) => {
            if (error) {
                console.error('Error en bookingRoom (UPDATE):', error); // Añadir logs para debugging
                return callback(error);
            }
            console.log('Resultados de la reserva:', results); // Añadir logs para verificar los resultados
            callback(null, results);
        });
    });
};



////////////////////////////////////
const obtenerHabitaciones = (callback) => {
    //Se consulta todas los habitaciones en la base de datos
    connection.query('SELECT * FROM habitaciones', (err, results) => {
        //Si hay error
        if(err){
            //Se devuelve información del error
            callback(err, null);
        }else{
            //Si no hay error se devuelve el resultado
            callback(null, results);
        }
    });
};


/////////////////////////////////








module.exports = {
    obtenerHabitaciones,
    checkEmailExists,
    registerUser,
    authenticateUser,
    bookingRoom
};

  
// const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', 
//     database: 'hotel_db'
//   });
  
//   const registerUser = (first_name,last_name, password,email,phone, role, callback) => {
//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) return callback(err);
  
//       connection.query(
//         'INSERT INTO users (first_name,last_name, password,email,phone, role) VALUES (?, ?, ?, ?, ?, ?)',
//         [first_name,last_name, hash, email,phone, role],
//         (error, result) => {
//           if (error) {
//             return callback(error);
//           }
//           callback(null, result);
//         }
//       );
//     });
//   };
  
//   module.exports = {
//     registerUser,
//   };
  