const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User'); // Asegúrate de que la ruta es correcta

const crearUsuario = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔌 Conectado a MongoDB');

    const contrasenaPlana = '123456'; // Puedes cambiarla
    const hash = await bcrypt.hash(contrasenaPlana, 10);

    const nuevoUsuario = new User({
      nombre: 'Admin Principal',
      correo: 'admin@panaderia.com',
      contrasena: hash,
      rol: 'administrador' // Puedes probar también con 'vendedor' o 'cliente'
    });

    await nuevoUsuario.save();
    console.log('✅ Usuario creado con éxito');
    console.log('➡️ Correo: admin@panaderia.com');
    console.log('➡️ Contraseña: 123456');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error al crear el usuario:', error);
  }
};

crearUsuario();
