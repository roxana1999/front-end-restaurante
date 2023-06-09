export class Producto {
    idProducto: number
    nombreProducto: string
    idCategoria: number
    precioVenta: number
    constructor(
        idProducto: number,
        nombreProducto: string,
        idCategoria: number,
        precioVenta: number
    ) {
        this.idProducto = idProducto
        this.nombreProducto = nombreProducto
        this.idCategoria = idCategoria
        this.precioVenta = precioVenta
    }
}

export class DatosProducto {
    estado?: string
    mensaje?: string
    datos?: Producto
}