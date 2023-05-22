export class Reserva {
    id?: number
    idMesa: number
    fechaReserva: string
    horaInicioReserva: string
    horaFinReserva: string
    idCliente: string
    cantidadMesa: string

    constructor(
        idMesa: number,
        fechaReserva: string,
        horaInicioReserva: string,
        horaFinReserva: string,
        idCliente: string,
        cantidadMesa: string
    ) {
        this.idMesa = idMesa
        this.fechaReserva = fechaReserva
        this.horaInicioReserva = horaInicioReserva
        this.horaFinReserva = horaFinReserva
        this.idCliente = idCliente
        this.cantidadMesa = cantidadMesa
    }
}

export class DatosReserva {
    estado?: string
    mensaje?: string
    datos?: Reserva
}