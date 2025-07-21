const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['administrador', 'vendedor', 'cliente'], default: 'cliente' }
});

module.exports = mongoose.model('User', userSchema);
