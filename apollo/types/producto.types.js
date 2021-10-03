module.exports = `
    type Producto{
        idProducto: ID!
        descripcion: String
        valor: Int
        stock: Int
    }

    type Alert{
        message: String
    }

    input ProductoInput{
        descripcion: String!
        valor: Int!
        stock: Int!
    }

    extend type Query{
        getProductos(page: Int, limit: Int = 1): [Producto]
        getProd(id: ID!): Producto
    }

    extend type Mutation{
        addProd(input: ProductoInput): Producto
        updProd(id: ID!, input: ProductoInput): Producto
        delProd(id: ID!): Alert
    }
`
