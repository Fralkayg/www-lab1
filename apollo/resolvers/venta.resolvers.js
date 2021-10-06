//todo
const detalleVentaResolvers = require('../resolvers/detalleVenta.resolvers');
let ventas = require("../ventas");
const productoResolvers = require('./producto.resolvers');
// let detalleVentas = require("../detalleVentas");

module.exports = {    
    Query:{
        buscarVenta(obj, { idVenta }){
            const venta = ventas.find( (venta) => venta.idVenta == idVenta);

            return venta;
        }
    },
    Mutation: {
        // buscarDetalle(obj, { idVenta }){
        //     return detalleVentas.filter( (detalle) => detalle.idVenta == idVenta);
        // },
        calculoTotal(obj, { idVenta }){
            let total = 0;

            const detalleVenta = detalleVentaResolvers.Mutation.buscarDetalle(obj, { idVenta: idVenta });

            detalleVenta.forEach( (detalle) => {
                const producto = productoResolvers.Query.getProd(obj, { id: detalle.idProducto});
                
                const costo = producto.valor * detalle.cantidad;

                total += costo;
            });
            return total;
        },
        addVenta(obj, { input }){
            const idVenta = String(ventas.length + 1);

            input.detalleVenta.forEach( (detalle) => {
                detalle.idVenta = idVenta;
                const result = detalleVentaResolvers.Mutation.addDetalle(obj, { input: {
                    "cantidad": detalle.cantidad,
                    "idProducto": detalle.idProducto,
                    "idVenta": detalle.idVenta
                }});
                detalle.idDetalle = result.id;
            });

            let total = this.calculoTotal(obj, { idVenta: idVenta });

            const venta = { idVenta, total, ...input };

            ventas.push(venta);
            
            return { message: `Se agrego una nueva venta con ID ${idVenta}`};
        },
        updVenta(obj, { id, input}){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == -1)? false:true;

            if (isOk){
                const venta = ventas[indice];

                detalles = detalleVentaResolvers.Mutation.buscarDetalle(obj, { idVenta: id });

                detalles.forEach( (detalle) => {
                    detalleVentaResolvers.Mutation.delDetalle(obj, { id: detalle.idDetalle });
                });

                input.detalleVenta.forEach((detalle) => {
                    const result = detalleVentaResolvers.Mutation.addDetalle(obj, { input: {
                            "idVenta": detalle.idVenta,
                            "idProducto": detalle.idProducto,
                            "cantidad": detalle.cantidad
                    }});
                    detalle.idDetalle = result.id;
                });

                const nuevoTotal = this.calculoTotal(obj, { idVenta: id });

                venta.total = nuevoTotal;
                
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
                detalles = detalleVentaResolvers.Mutation.buscarDetalle(obj, { idVenta: idVenta});

                detalles.forEach( (detalle) => {
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