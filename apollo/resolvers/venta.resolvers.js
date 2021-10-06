//todo
const detalleVentaResolvers = require('../resolvers/detalleVenta.resolvers');
let ventas = require("../ventas");
let detalleVentas = require("../detalleVentas");

module.exports = {    
    Query:{
        buscarVenta(obj, { idVenta }){
            const venta = ventas.find( (venta) => venta.idVenta == idVenta);

            console.log(venta);

            return venta;
        }
    },
    Mutation: {
        buscarDetalle(obj, { idVenta }){
            return detalleVentas.filter( (detalle) => detalle.idVenta == idVenta);
        },
        calculoTotal(obj, { idVenta }){
            let total = 0;

            const detalleVenta = this.buscarDetalle(obj, { "idVenta": idVenta });

            detalleVenta.forEach( (detalle) => {
                const producto = detalleVentaResolvers.Query.buscarProducto(obj, { id: detalle.idProducto});
                
                const costo = producto.valor * detalle.cantidad;

                total += costo;
            });
            return total;
        },
        addVenta(obj, { input }){
            const idVenta = String(ventas.length + 1);

            input.detalleVentas.forEach( (detalle) => {
                detalle.idVenta = idVenta;
                detalleVentaResolvers.Mutation.addDetalle(obj, { input: {
                    "cantidad": detalle.cantidad,
                    "idProducto": detalle.idProducto,
                    "idVenta": detalle.idVenta
                }});
            });

            let total = this.calculoTotal(obj, idVenta);

            const venta = { idVenta, total, ...input };

            console.log(venta);

            ventas.push(venta);
            
            return { message: `Se agrego una nueva venta con ID ${idVenta}`};
        },
        updVenta(obj, { id, input}){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == -1)? false:true;

            if (isOk){
                const venta = ventas[indice];

                detalleVentas = detalleVentas.filter((detalle) => detalle.idVenta != id);

                input.detalleVentas.forEach((detalle) => {
                    const result = detalleVentaResolvers.Mutation.addDetalle(obj, detalle.idDetalle, { input: {
                            "idVenta": detalle.idVenta,
                            "idProducto": detalle.idProducto,
                            "cantidad": detalle.cantidad
                    }});
                });

                const nuevoTotal = this.calculoTotal(obj, id);

                input.total = nuevoTotal;
                
                const ventaActualizado = Object.assign(venta, {id, ...input});

                ventas[indice] = ventaActualizado;
                return { message: `Se actualizo la venta con ID: ${id}` };
            }else{
                return { message: `No se puede actualizar la venta con ID: ${id} debido a que no se encontró la venta.` };
            }            
        },
        delVenta(obj, id){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == -1)? false:true;

            if (isOk){
                detalleVentas = detalleVentas.filter( (detalle) => detalle.idVenta == idVenta);

                detalleVentas.forEach( (detalle) => {
                    detalleVentaResolvers.Mutation.delDetalle(obj, { id: detalle.idDetalle });
                });

                ventas = ventas.filter( (venta) => venta.idVenta != id);

                return { message: `Se elimino la venta con id ${id}.` };
            }else{
                return { message: `No se pudo eliminar la venta con ID: ${id} debido a que no se encontró la venta.` };
            }
        },
    }
}