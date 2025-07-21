const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await User.findOne({ correo });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: { nombre: user.nombre, correo: user.correo, rol: user.rol }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
