const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');

const { merge } = require('lodash');

//Importamos datos de prueba
// let cursos = require('./cursos');
// let productos = require('./productos');

const productoTypeDefs = require('./types/producto.types')
const productoResolvers = require('./resolvers/producto.resolvers');

//Definición de estructuras graphql
const typeDefs = `
    type Alert{
        message: String
    }

    type Query{
        _ : Boolean
    }

    type Mutation{
        _ : Boolean
    }
`;

const resolver = {};

//La asignación de definiciones y metodos de resolución
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, productoTypeDefs],
    resolvers: merge(resolver, productoResolvers)
});

//Asignación de definiciones y metodos de resolución
const server = new ApolloServer({
    schema: schema
});

//Por defecto puerto 4000
server.listen().then(({url}) => {
    console.log(`Servidor iniciado en ${url}`)

});