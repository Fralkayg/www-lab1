# Query - Mutation

```js
query Query($getProdId: ID!) {
  getProd(id: $getProdId) {
    idProducto
    descripcion
    valor
    stock
  }

}


mutation Mutation($addDetalleInput: DetalleVentaInput) {
   addDetalle(input: $addDetalleInput) {
    message
  }
}
mutation Mutation2($updDetalleId: ID!, $updDetalleInput: DetalleVentaInput){
    updDetalle(id: $updDetalleId, input: $updDetalleInput) {
    message
  }
}

mutation Mutation3 ($delDetalleId: ID!){
    delDetalle(id: $delDetalleId) {
    message
  }
}


mutation BuscarDetalleMutation($buscarDetalleIdVenta: ID!) {
  buscarDetalle(idVenta: $buscarDetalleIdVenta) {
    idVenta
    cantidad
    idProducto
    idDetalle
  }
}
```

# Variables
```json
{
  "getProdId": "1",
  "addDetalleInput": {
        "cantidad": 1,
        "idProducto": "1",
        "idVenta": "2"
    },
    "updDetalleId": "4",
    "updDetalleInput": {
        "cantidad": 2,
        "idProducto": "1",
        "idVenta": "2"
    },
    "delDetalleId": "4",
    "buscarDetalleIdVenta": "2"
}
```