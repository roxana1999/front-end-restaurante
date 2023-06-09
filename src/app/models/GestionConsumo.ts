import { Cliente } from "./Cliente"

export class GestionConsumo {
    cabecera?: Cabecera
    detalles: Detalle[] = []
}

export class Cabecera {
    idCabecera?: number
    idMesa?: number
    idCliente?: number
    estado?: string
    total?: number
    fechaCreacion?: string
    horaCreacion?: string
    fechaCierre?: string
    horaCierre?: string
}

export class DatosCabecera{
    estado?: string
    mensaje?: string
    datos?: Cabecera
}

export class Detalle {
    idProducto: number
    cantidad: number
    nombreProducto?: string
    idCabecera?: number
    totalCabecera?: number
    idDetalle?: number
    constructor(idProducto: number, cantidad: number) {
        this.idProducto = idProducto
        this.cantidad = cantidad
    }
}

export class DatosDetalle {
    estado?: string
    mensaje?: string
    datos?: Detalle
}

export class DatosConsumicionMesa {
    estado?: string
    mensaje?: string
    datos: EstadoConsumicion[] = []
}

export class EstadoConsumicion {
    clientes?: Cliente
    detalles?: Detalle[] = []
    estado?: string
    fechaHoraFinConsumo?: string
    fechaHoraInicioConsumo?: string
    idCabecera?: number
    total?: number
}

export class DatosBase64{
    estado?: string
    mensaje?: string
    datos?: string
}