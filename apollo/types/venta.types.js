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
        detalleVentas: [DetalleVentaInput]
    }

    extend type Query{
        buscarVenta(idVenta: ID!): Venta
        buscarDetalle(idVenta: ID!): [DetalleVenta]
        calculoTotal(idVenta: ID!): Int
    }

    extend type Mutation{
        addVenta(input: VentaInput): Venta
        updVenta(id: ID!, input: VentaInput): Venta
        delVenta(id: ID!): Alert
    }
`
