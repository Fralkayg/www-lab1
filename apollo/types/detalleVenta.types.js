module.exports = `
    type DetalleVenta{
        idVenta: ID
        cantidad: String
        idProducto: String
        idDetalle: String
    }

    type Alert{
        message: String
    }

    input DetalleVentaInput{
        cantidad: Int!
        idProducto: String!
        idVenta: String
    }

    extend type Query{
        buscarDetalle(idVenta: ID!): [DetalleVenta]
    }

    extend type Mutation{
        addDetalle(input: DetalleVentaInput): Alert
        updDetalle(id: ID!, input: DetalleVentaInput): Alert
        delDetalle(id: ID!): Alert
    }
`