# Query - Mutation

```js
query Query($buscarVentaIdVenta: ID!) {
  buscarVenta(idVenta: $buscarVentaIdVenta) {
    idVenta
    fechaVenta
    total
    detalleVenta {
      idVenta
      cantidad
      idProducto
      idDetalle
    }
  }
}

mutation CalculoTotalMutation($calculoTotalIdVenta: ID!) {
  calculoTotal(idVenta: $calculoTotalIdVenta)
}

mutation AddVentaMutation($addVentaInput: VentaInput) {
  addVenta(input: $addVentaInput) {
    message
  }
}


mutation UpdVentaMutation($updVentaId: ID!, $updVentaInput: VentaInput) {
  updVenta(id: $updVentaId, input: $updVentaInput) {
    message
  }
}



mutation DelVentaMutation($delVentaId: ID!) {
  delVenta(id: $delVentaId) {
    message
  }
}



mutation ActualizarTotalMutation($actualizarTotalIdVenta: ID!) {
  actualizarTotal(idVenta: $actualizarTotalIdVenta) {
    message
  }
}
```

# Variables
```json
{
  "buscarVentaIdVenta": "1",
  "calculoTotalIdVenta": "1",

  "addVentaInput": {
    "fechaVenta": "20/10/1999",
    "detalleVenta":[
      {
        "idVenta": "3",
        "cantidad": 2,
        "idProducto": "3"
      },
      {
        "idVenta": "3",
        "cantidad": 4,
        "idProducto": "4"
      }
    ]
  },

  "updVentaId": "3",
  
  "updVentaInput": {
    "fechaVenta": "21/11/1999",
    "detalleVenta":[
      {
        "idVenta":"3",
        "cantidad": 1,
        "idProducto": "3"

      },
      {
        "idVenta":"3",
        "cantidad": 1,
        "idProducto": "4"
      }
    ]
  },
  
  "delVentaId": "3",

  "actualizarTotalIdVenta": "3"
}
```
