const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    titulo: String,
    visitas: Number
});

module.exports = mongoose.model('Curso', cursoSchema);