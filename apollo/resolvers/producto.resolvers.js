let productos = require("../productos");

module.exports = {
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