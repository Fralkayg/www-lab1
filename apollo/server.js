const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

//Importamos datos de prueba
let cursos = require('./cursos');


//Definición de estructuras graphql
const typeDefs = `
    type Curso{
        id: ID!
        titulo: String!
        visitas: Int
    }

    input CursoInput{
        titulo: String!
        visitas: Int
    }

    type Query {
        getCursos (page: Int, limit: Int = 1): [Curso]
    }    

    type Mutation{
        addCurso(input: CursoInput): Curso
    }
`;

//La asignación de definiciones y metodos de resolución
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: {
        Query:{
            //La definición de metodos de consultas es método(obj, { params ... } )
            getCursos(obj, { page, limit }){
                if (page !== undefined){
                    return cursos.slice((page - 1) * limit, (page)*limit);
                }
                return cursos;
            }
        },
        Mutation:{
            //La definición de metodos de mutaciones es método(obj, { params ... })
            addCurso(obj, { input }){
                const id = String(cursos.length + 1);

                //Spread operator: Toma todos los parametros internos de input
                const curso = { id, ...input}

                cursos.push(curso);

                return curso;
            }
        }
    }
});

//Asignación de definiciones y metodos de resolución
const server = new ApolloServer({
    schema: schema
});

//Por defecto puerto 4000
server.listen().then(({url}) => {
    console.log(`Servidor iniciado en ${url}`)

});