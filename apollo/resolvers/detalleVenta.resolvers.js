//todo
let detalleVentas = require("../detalleVentas");
let productos = require("../productos");
let productoResolvers = require('../resolvers/producto.resolvers');

module.exports = {
    Query:{
        buscarProducto(obj, { id }){    
            console.log("id");
            console.log(id);   
            return productos.find( (producto) => id == producto.idProducto);
        }
    },
    Mutation: {
        addDetalle(obj, { input }){
            const indiceProducto = productos.findIndex( (producto) => input.idProducto == producto.idProducto);
            
            const isOk = (indiceProducto == -1)? false: true;

            if (isOk){
                let producto = productos[indiceProducto];
                if (producto.stock > input.cantidad){
                    producto.stock -= input.cantidad;
                    productos[indiceProducto] = producto;

                    const idDetalle = String(detalleVentas.length + 1);

                    const detalle = {idDetalle, ...input};

                    detalleVentas.push(detalle);
                    return { message: `Se agrego el nuevo detalle de venta con ID ${idDetalle}`, id: idDetalle, id: idDetalle };
                }else{
                    return { message: `No hay suficiente stock del producto con ID ${input.idProducto}` };
                }
            }else{
                return { message: `El producton con ID ${input.idProducto} no existe.`};
            }
        },
        updDetalle(obj, { id, input }){
            const indice = detalleVentas.findIndex( (detalleVenta) => detalleVenta.idDetalle == id);

            const isOk = (indice == -1)? false: true;

            if (isOk){
                const detalleVenta = detalleVentas[indice];

                let productoAntiguo = productoResolvers.Query.buscarProducto(detalleVenta.idProducto);
                let productoNuevo = productoResolvers.Query.buscarProducto(input.idProducto);

                if (input.cantidad < productoNuevo.stock){
                    //se puede hacer el cambio
                    productoAntiguo = updProd(productoAntiguo.idProducto, { 
                        "descripcion": productoAntiguo.descripcion,
                        "valor": productoAntiguo.valor,
                        "stock": productoAntiguo.stock + detalleVenta.stock });
                    
                    productoNuevo = updProd(productoNuevo.idProducto, {
                        "descripcion": productoNuevo.descripcion,
                        "valor": productoNuevo.valor,
                        "stock": productoNuevo.stock - input.cantidad
                    });

                    const detalleActualizado = Object.assign(detalleVenta, { id, ...input});

                    detalleVentas[indice] = detalleActualizado;

                    //calcular el total nuevamente

                    return { message: `Se actualizo el detalle de venta con ID: ${id}` };
                }else{
                    return { message: `No se puede actualizar el detalle de venta con ID: ${id} debido a problemas de stock.` };
                }
            }else{
                return { message: `No se puede actualizar el detalle de venta con ID: ${id} debido a que no se encontró el detalle de venta.` };
            }
        },
        delDetalle(obj, id){
            const indice = detalleVentas.findIndex( (detalleVenta) => detalleVenta.idDetalle == id);

            const isOk = (indice == -1)? false: true;

            if (isOk){
                const detalleVenta = detalleVentas[indice];

                let productoAntiguo = productoResolvers.Query.buscarProducto(detalleVenta.idProducto);

                productoAntiguo = updProd(productoAntiguo.idProducto, { 
                    "descripcion": productoAntiguo.descripcion,
                    "valor": productoAntiguo.valor,
                    "stock": productoAntiguo.stock + detalleVenta.cantidad });
                
                detalleVentas = detalleVentas.filter( (detalleVenta) => detalleVenta.idDetalle != id);
                return { message: `Se elimino el detalle de venta con id ${id}.` };
            }else{
                return { message: `No se pudo eliminar el detalle de venta con ID: ${id} debido a que no se encontró el detalle de venta.` };
            }
        }
    }
}