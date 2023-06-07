export class GestionConsumo {
    cabecera?: {
        idMesa: number
        idCliente: number
        estado: string
        total: number
        fehcaCreacion: string
        horaCreacion: string
        fechaCierre: string
        horaCierre: string
    }
    detalles?: {
        idProducto: number
        cantidad: number
    }
}