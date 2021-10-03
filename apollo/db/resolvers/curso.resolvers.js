//let cursos = [];
const curso = require('../models/curso');
const Curso = require('../models/curso');
module.exports = {
    Query:{
        async getCursos(obj, {page, limit}){
            //Curso.find() es una busqueda de tipo mongoSchema para encontrar objetos
            const cursos = await Curso.find();
            return cursos;
        },
        async getCurso(obj, { id }){
            const curso = await Curso.findById(id);

            return curso;
        }
    },
    Mutation: {
        async addCurso(obj, { input }){
            //Crea un objeto de tipo mongo schema
            const curso = new Curso(input);

            //Metodo de guardado de mongodb
            await curso.save(); //Objeto flush (id se va a llenar con el id de mongo db)
            return curso;
        },
        async updateCurso(obj, { id, input}){
            const curso = await Curso.findByIdAndUpdate(id, input);
            return curso;
        },
        async deleteCurso(obj, { id}){
            await Curso.deleteOne({ _id: id });
            return {
                message: `El curso con id ${id} fue eliminado.` 
            };
        }
    }
}