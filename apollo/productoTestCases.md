# Query - Mutation

```js
query Query($getProdId: ID!) {
  getProd(id: $getProdId) {
    idProducto
    descripcion
    valor
    stock
  }
  getProductos {
    idProducto
    descripcion
    valor
    stock
  }
}

mutation AddProdMutation($addProdInput: ProductoInput) {
  addProd(input: $addProdInput) {
    valor
    stock
    descripcion
  }
}


mutation UpdProdMutation($updProdId: ID!, $updProdInput: ProductoInput) {
  updProd(id: $updProdId, input: $updProdInput) {
    idProducto
    descripcion
    valor
    stock
  }
}


mutation DelProdMutation($delProdId: ID!) {
  delProd(id: $delProdId) {
    message
  }
}
```

# Variables
```json
{
  "getProdId": "3",
  "addProdInput": {
    "descripcion": "Radio",
    "valor": 800,
    "stock": 1000
  },
  "updProdId": "7",
  "updProdInput": {
    "descripcion": "Radio v2",
    "valor": 700,
    "stock": 1000
  },
  "delProdId": "6"
}
```