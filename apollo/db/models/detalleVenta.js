const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
    idVenta: String,
    cantidad: Number,
    idProducto: String,
    idDetalle: String
});

module.exports = mongoose.model('DetalleVenta', detalleVentaSchema);