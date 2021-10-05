//todo
const productoResolvers = require('../resolvers/producto.resolvers');
const detalleVentaResolvers = require('../resolvers/detalleVenta.resolvers');
let ventas = require("../ventas");
let detalleVentas = require("../detalleVentas")
let productos = require("../productos");

module.exports = {
    Query:{
        buscarVenta(obj, { idVenta }){
            const venta = ventas.find( (venta) => venta.idVenta == idVenta);

            return venta;
        },
        buscarDetalle(obj, { idVenta}){
            return detalleVentas.filter( (detalle) => detalle.idVenta == idVenta);
        }
    },
    Mutation: {
        addVenta(obj, { input }){

        },
        updVenta(obj, { input}){

        },
        delVenta(obj, { input}){

        },

        // addProd(obj, { input }){
        //     const idProducto = String(productos.length + 1);

        //     const producto = { idProducto, ...input };

        //     productos.push(producto);

        //     return producto;
        // },
        // updProd(obj, { id, input}){
        //     const indice = productos.findIndex( (producto) => producto.idProducto == id);

        //     const producto = productos[indice];

        //     const nuevoProducto = Object.assign(producto, { id, ...input });

        //     productos[indice] = nuevoProducto;

        //     return nuevoProducto;
        // },
        // delProd(obj, { id }){
        //     productos = productos.filter( (producto) => producto.idProducto != id);
        //     return{
        //         message: `Se elimino el curso con id ${id}.`
        //     }
        // }
    }
}