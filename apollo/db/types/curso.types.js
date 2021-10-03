module.exports = `
    type Curso{
        id: ID!
        titulo: String!
        visitas: Int
    }

    type Alert{
        message: String
    }

    input CursoInput{
        titulo: String!
        visitas: Int
    }

    extend type Query{
        getCursos(page: Int, limit: Int = 1): [Curso]
        getCurso(id: ID!): Curso
    }

    extend type Mutation{
        addCurso(input: CursoInput): Curso
        updateCurso(id: ID!, input: CursoInput): Curso
        deleteCurso(id: ID!): Alert
    }
`