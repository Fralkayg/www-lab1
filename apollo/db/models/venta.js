const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    idVenta: String,
    fechaVenta: {type: Date, default: Date.now },
    total: Number,
    detalleVenta: {type: mongoose.Schema.Types.ObjectId, ref: 'DetalleVenta'}
});

module.exports = mongoose.model('Venta', ventaSchema);