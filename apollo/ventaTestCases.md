# Query - Mutation

```js
query Query($buscarVentaIdVenta: ID!, $buscarDetalleIdVenta: ID!, $calculoTotalIdVenta: ID!) {
  buscarVenta(idVenta: $buscarVentaIdVenta) {
    detalleVenta {
      idVenta
      cantidad
      idProducto
      idDetalle
    }
    idVenta
    fechaVenta
    total
  }
  buscarDetalle(idVenta: $buscarDetalleIdVenta) {
    idVenta
    cantidad
    idProducto
    idDetalle
  }
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
```

# Variables
```json
{
  "buscarVentaIdVenta": "1",
  "buscarDetalleIdVenta": "2",
  "calculoTotalIdVenta": "2",

  "addVentaInput": {
    "fechaVenta": "20/10/1999",
    "detalleVentas":[
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

  "updVentaId": null,
  "updVentaInput": null,
}
```

mutation UpdVentaMutation($updVentaId: ID!, $updVentaInput: VentaInput) {
  updVenta(id: $updVentaId, input: $updVentaInput) {
    message
  }
}

---

{
  "buscarVentaIdVenta": "3",

  "buscarDetalleIdVenta": "1",
  "calculoTotalIdVenta": "1",

  "addVentaInput": {
    "fechaVenta": "20/10/1999",
    "detalleVenta":[
      {
        "idVenta":"2",
        "cantidad": 2,
        "idProducto": "3"
      },
      {
        "idVenta":"3",
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

  "delVentaId": "3"
}