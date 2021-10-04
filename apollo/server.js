const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');

const { merge } = require('lodash');

//Importamos datos de prueba
// let cursos = require('./cursos');
// let productos = require('./productos');

const productoTypeDefs = require('./types/producto.types')
const productoResolvers = require('./resolvers/producto.resolvers');

const detalleVentaTypeDefs = require('./types/detalleVenta.types');
const detalleVentaResolvers = require('./resolvers/detalleVenta.resolvers');

const ventaTypeDefs = require('./types/venta.types');
const ventaResolvers = require('./resolvers/venta.resolvers');

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
    typeDefs: [typeDefs, productoTypeDefs, detalleVentaTypeDefs, ventaTypeDefs],
    resolvers: merge(resolver, productoResolvers)
});
// , detalleVentaTypeDefs, ventaTypeDefs
// , detalleVentaResolvers, ventaResolvers
//Asignación de definiciones y metodos de resolución
const server = new ApolloServer({
    schema: schema
});

//Por defecto puerto 4000
server.listen().then(({url}) => {
    console.log(`Servidor iniciado en ${url}`)

});