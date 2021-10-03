const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { merge } = require('lodash');

const cursoTypeDefs = require('./types/curso.types');
const cursoResolvers = require('./resolvers/curso.resolvers');

mongoose.connect('mongodb+srv://admin:admin@cluster0.wofd4.mongodb.net/test');

const app = express();

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

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, cursoTypeDefs],
    resolvers: merge(resolver, cursoResolvers)
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen(8080, function(){
    console.log("Servidor iniciado");
    console.log(mongoose.version);
});