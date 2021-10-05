module.exports = `
    type Venta{
        idVenta: ID!
        fechaVenta: String!
        total: Int
        detalleVenta: [DetalleVenta]
    }

    type Alert{
        message: String
    }

    input VentaInput{
        fechaVenta: String!
        total: Int!
        detalleVenta: [DetalleVentaInput]
    }

    extend type Query{
        buscarVenta(idVenta: ID!): Venta
        buscarDetalle(idVenta: ID!): [DetalleVenta]
        calculoTotal: Int
    }

    extend type Mutation{
        addVenta(input: VentaInput): Venta
        updVenta(id: ID!, input: VentaInput): Venta
        delVenta(id: ID!): Alert
    }
`
