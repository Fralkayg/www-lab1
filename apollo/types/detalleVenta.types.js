module.exports = `
    type DetalleVenta{
        idVenta: ID!
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
        idDetalle: String!
    }

    extend type Query{
        buscarProducto(id: ID!): Producto
    }

    extend type Mutation{
        addDetalle(input: DetalleVentaInput): DetalleVenta
        updDetalle(id: ID!, input: DetalleVentaInput): DetalleVenta
        delDetalle(id: ID!): Alert
    }
`