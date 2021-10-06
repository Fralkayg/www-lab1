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
        detalleVenta: [DetalleVentaInput]
    }

    extend type Query{
        buscarVenta(idVenta: ID!): Venta
    }

    extend type Mutation{
        buscarDetalle(idVenta: ID!): [DetalleVenta]
        calculoTotal(idVenta: ID!): Int
        addVenta(input: VentaInput): Alert
        updVenta(id: ID!, input: VentaInput): Alert
        delVenta(id: ID!): Alert
    }
`
