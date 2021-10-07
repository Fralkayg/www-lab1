const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');

const { merge } = require('lodash');

//Importamos datos de prueba
// let cursos = require('./cursos');
let productos = require('./productos');
let detalleVentas = require('./detalleVentas');
let ventas = require('./ventas');

const productoTypeDefs = require('./types/producto.types')
const productoResolvers = {
    Query:{
        getProductos(obj, { page, limit }){
            if (page !== undefined){
                return productos.slice((page - 1) * limit, (page)*limit);
            }
            return productos;
        },
        getProd(obj, { id }){       
            return productos.find( (producto) => id == producto.idProducto);
        }
    },
    Mutation: {
        addProd(obj, { input }){
            const idProducto = String(productos.length + 1);

            const producto = { idProducto, ...input };

            productos.push(producto);

            return producto;
        },
        updProd(obj, { id, input}){
            const indice = productos.findIndex( (producto) => producto.idProducto == id);

            const producto = productos[indice];

            const nuevoProducto = Object.assign(producto, { id, ...input });

            productos[indice] = nuevoProducto;

            return nuevoProducto;
        },
        delProd(obj, { id }){
            productos = productos.filter( (producto) => producto.idProducto != id);
            return{
                message: `Se elimino el curso con id ${id}.`
            }
        }
    }
}

const detalleVentaTypeDefs = require('./types/detalleVenta.types');
const detalleVentaResolvers = {
    Query:{
        buscarDetalle(obj, { idVenta }){
            return detalleVentas.filter( (detalle) => detalle.idVenta == idVenta);
        },
    },
    Mutation: {
        addDetalle(obj, { input }){
            let venta = ventaResolvers.Query.buscarVenta(obj, { idVenta: input.idVenta });

            if (venta != undefined){
                let producto = productoResolvers.Query.getProd(obj, { id: input.idProducto });

                if (producto != undefined){
                    if (producto.stock > input.cantidad){
                        producto.stock -= input.cantidad;

                        console.log(input.cantidad);

                        productoResolvers.Mutation.updProd(obj, {id: producto.idProducto, input: { 
                            "descripcion": producto.descripcion,
                            "valor": producto.valor,
                            "stock": producto.stock }});

                        const idDetalle = String(detalleVentas.length + 1);

                        const detalle = {idDetalle, ...input};

                        detalleVentas.push(detalle);

                        ventaResolvers.Mutation.actualizarTotal(obj, {id: input.idVenta});

                        return { message: `Se agrego el nuevo detalle de venta con ID ${idDetalle}`, id: idDetalle, id: idDetalle };
                    }else{
                        return { message: `No hay suficiente stock del producto con ID ${input.idProducto}` };
                    }
                }else{
                    return { message: `El producton con ID ${input.idProducto} no existe.`};
                }
            }else{
                return { message: `La venta con ID ${input.idVenta} no existe.`};
            }

            
        },
        updDetalle(obj, { id, input }){
            const indice = detalleVentas.findIndex( (detalleVenta) => detalleVenta.idDetalle == id);

            const isOk = (indice == -1)? false: true;

            if (isOk){
                const detalleVenta = detalleVentas[indice];

                let productoAntiguo = productoResolvers.Query.getProd(obj, { id: detalleVenta.idProducto });
                let productoNuevo = productoResolvers.Query.getProd(obj, { id: input.idProducto });

                if (input.cantidad < productoNuevo.stock){
                    //se puede hacer el cambio
                    productoAntiguo = productoResolvers.Mutation.updProd(obj, {id: productoAntiguo.idProducto, input: { 
                        "descripcion": productoAntiguo.descripcion,
                        "valor": productoAntiguo.valor,
                        "stock": productoAntiguo.stock + detalleVenta.cantidad 
                    }});
                    
                    productoNuevo = productoResolvers.Mutation.updProd(obj, {id: productoNuevo.idProducto, input: {
                        "descripcion": productoNuevo.descripcion,
                        "valor": productoNuevo.valor,
                        "stock": productoNuevo.stock - input.cantidad
                    }});

                    const detalleActualizado = Object.assign(detalleVenta, { ...input});

                    detalleVentas[indice] = detalleActualizado;

                    return { message: `Se actualizo el detalle de venta con ID: ${id}` };
                }else{
                    return { message: `No se puede actualizar el detalle de venta con ID: ${id} debido a problemas de stock.` };
                }
            }else{
                return { message: `No se puede actualizar el detalle de venta con ID: ${id} debido a que no se encontró el detalle de venta.` };
            }
        },
        delDetalle(obj, { id }){
            const indice = detalleVentas.findIndex( (detalleVenta) => detalleVenta.idDetalle == id);

            const isOk = (indice == -1)? false: true;

            if (isOk){
                const detalleVenta = detalleVentas[indice];

                let productoAntiguo = productoResolvers.Query.getProd(obj, { id: detalleVenta.idProducto });

                productoAntiguo = productoResolvers.Mutation.updProd(obj, {id: productoAntiguo.idProducto, input: { 
                    "descripcion": productoAntiguo.descripcion,
                    "valor": productoAntiguo.valor,
                    "stock": productoAntiguo.stock + detalleVenta.cantidad }});
                
                detalleVentas = detalleVentas.filter( (detalleVenta) => detalleVenta.idDetalle != id);

                return { message: `Se elimino el detalle de venta con id ${id}.` };
            }else{
                return { message: `No se pudo eliminar el detalle de venta con ID: ${id} debido a que no se encontró el detalle de venta.` };
            }
        }
    }
}

const ventaTypeDefs = require('./types/venta.types');
const ventaResolvers = {    
    Query:{
        buscarVenta(obj, { idVenta }){
            const venta = ventas.find( (venta) => venta.idVenta == idVenta);
            return venta;
        }
    },
    Mutation: {
        calculoTotal(obj, { idVenta }){
            let total = 0;

            const detalleVenta = detalleVentaResolvers.Query.buscarDetalle(obj, { idVenta: idVenta });

            detalleVenta.forEach( (detalle) => {
                const producto = productoResolvers.Query.getProd(obj, { id: detalle.idProducto});
                
                const costo = producto.valor * detalle.cantidad;

                total += costo;
            });
            return total;
        },
        addVenta(obj, { input }){
            const idVenta = String(ventas.length + 1);

            let AuxDetallesConId= [];

            let Aux = detalleVentas.length + 1;

            input.detalleVenta.forEach( (detalle) => {
                const idDetalle = String(Aux);
                detalle.idDetalle = idDetalle;
                AuxDetallesConId.push(detalle);
                Aux+=1;
            });

            input.detalleVenta = AuxDetallesConId;

            let total = 0;

            const venta = { idVenta, total, ...input };

            ventas.push(venta);

            input.detalleVenta.forEach( (detalle) => {
                detalle.idVenta = idVenta;
                const result = detalleVentaResolvers.Mutation.addDetalle(obj, { input: {
                    "cantidad": detalle.cantidad,
                    "idProducto": detalle.idProducto,
                    "idVenta": detalle.idVenta
                }});
            });
            
            return { message: `Se agrego una nueva venta con ID ${idVenta}`};
        },
        updVenta(obj, { id, input}){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == -1)? false:true;

            if (isOk){
                const venta = ventas[indice];

                let detalles = detalleVentaResolvers.Query.buscarDetalle(obj, { idVenta: id });

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
        delVenta(obj, { id }){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == -1)? false:true;

            if (isOk){
                detalles = detalleVentaResolvers.Query.buscarDetalle(obj, { idVenta: id});

                detalles.forEach( (detalle) => {
                    detalleVentaResolvers.Mutation.delDetalle(obj, { id: detalle.idDetalle });
                });

                ventas = ventas.filter( (venta) => venta.idVenta != id);

                return { message: `Se elimino la venta con id ${id}.` };
            }else{
                return { message: `No se pudo eliminar la venta con ID: ${id} debido a que no se encontró la venta.` };
            }
        },
        actualizarTotal(obj, { id }){
            const indice = ventas.findIndex( (venta) => venta.idVenta == id);

            const isOk = (indice == - 1)? false: true;
            
            if (isOk){
                let venta = ventas[indice];
                venta.total = this.calculoTotal(obj, { idVenta: id });
                ventas[indice] = venta;
                return { message: `Se actualizo la venta con ID: ${id}`}
            }
            return { message: `No se pudo actualizar la venta con ID: ${id}`}
        }
    }
}

//Definición de estructuras graphql
const typeDefs = `
    type Alert{
        message: String
    }

    type Query{
        _ : Boolean
    }

    type Mutation{
        _ : Boolean
    }
`;

const resolver = {};

//La asignación de definiciones y metodos de resolución
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, productoTypeDefs, detalleVentaTypeDefs, ventaTypeDefs],
    resolvers: merge(resolver, productoResolvers, detalleVentaResolvers, ventaResolvers)
});

//Asignación de definiciones y metodos de resolución
const server = new ApolloServer({
    schema: schema
});

//Por defecto puerto 4000
server.listen().then(({url}) => {
    console.log(`Servidor iniciado en ${url}`)

});