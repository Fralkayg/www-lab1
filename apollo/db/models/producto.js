const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    idProducto: String,
    descripcion: String,
    valor: Number,
    stock: Number
});

module.exports = mongoose.model('Producto', productoSchema);