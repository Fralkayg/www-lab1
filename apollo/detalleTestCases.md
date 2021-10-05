# Query - Mutation

```js
query Query($buscarProductoId: ID!) {
  buscarProducto(id: $buscarProductoId) {
    idProducto
    descripcion
    valor
    stock
  }
}

mutation Mutation($addDetalleInput: DetalleVentaInput, $updDetalleId: ID!, $updDetalleInput: DetalleVentaInput, $delDetalleId: ID!) {
  addDetalle(input: $addDetalleInput) {
    message
  }
  updDetalle(id: $updDetalleId, input: $updDetalleInput) {
    message
  }
  delDetalle(id: $delDetalleId) {
    message
  }
}
```

# Variables
```json
{
  "buscarProductoId": "1",
  "addDetalleInput": {
        "cantidad": 1,
        "idProducto": "1",
        "idVenta": "4"
    },
    "updDetalleId": "4",
    "updDetalleInput": {
        "cantidad": 2,
        "idProducto": "1",
        "idVenta": "4"
    },
    "delDetalleId": "4"
}
```