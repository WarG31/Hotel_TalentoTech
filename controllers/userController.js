const userModel = require('../models/userModel.js');

// Registrar un nuevo usuario
const registerUser = (req, res) => {
    const { first_name, last_name, password, email, phone, role } = req.body;

    // Verificar si el correo ya existe
    userModel.checkEmailExists(email, (error, emailExists) => {
        if (error) {
            console.error('Error en checkEmailExists:', error);
            return res.status(500).json({ error: 'Error de servidor' });
        }

        if (emailExists) {
            return res.status(400).json({ error: 'El correo ya está en uso' });
        }

        // Si el correo no existe, registrar el usuario
        userModel.registerUser(first_name, last_name, password, email, phone, role, (error, result) => {
            if (error) {
                console.error('Error en registerUser:', error);
                return res.status(500).json({ error: 'Error de servidor' });
            }
            res.json({ message: 'Usuario registrado correctamente' });
        });
    });
};

// Iniciar sesión
const loginUser = (req, res) => {
    const { email, password } = req.body;

    userModel.authenticateUser(email, password, (error, user) => {
        if (error) return res.status(500).json({ error: 'Error de servidor' });
        if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

        req.session.user_id = user.user_id;
        req.session.role = user.role;
        // console.log( req.session.user_id)
        res.json({ message: 'Inicio de sesión exitoso', first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role });
    });
};


const logoutUser = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Sesión cerrada' });
};



// Reserva de la habitación

const reservar = (req, res) => {
    const { room_type } = req.body;
    console.log('Tipo de habitación recibida', room_type)
    userModel.bookingRoom(room_type, (error, results) => {
        if (error) {
            console.error('Error en bookingRoom:', error);
            return res.status(500).json({ error: 'Error de servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(484).json({ message: 'No hay habitaciones disponibles de este tipo' });
        }
        res.status(200).json({ message: 'Habitación reservada exitosamente' })
        


    });
   
};



/////////////////
const obtenerHabitaciones = (req, res) => {
    //Ejecutamos obtenerHabitaciones definido en el modelo, Creamos una función callback para procesar el resultado
    userModel.obtenerHabitaciones((error, habitaciones) => {
        //Si hay error
        if(error){
            // Se envía un mensaje generico de error
            return res.status(500).json({ mensaje: "Error obteniendo las habitaciones"});
        }
        //Si no hay error se devuelve los vehiculos encontrados.
        return res.status(200).json(habitaciones);
    });
}
//////////////////







module.exports = {
    obtenerHabitaciones,
    registerUser,
    loginUser,
    logoutUser,
    reservar
};


// // Registrar un nuevo usuario
// const registerUser = (req, res) => {
//   const { first_name,last_name, password,email,phone, role } = req.body;

//   userModel.registerUser(first_name,last_name, password,email,phone, role, (error, result) => {
//     // console.log(error);
//     if (error) {
//       if (error.code === 'ER_DUP_ENTRY') {
//         return res.status(400).json({ error: 'El usuario ya existe' });
//       }
//       return res.status(500).json({ error: 'Error de servidor' });
//     }
//     res.json({ message: 'Usuario registrado correctamente' });
//   });
// };

// module.exports = {
//   registerUser
// };
