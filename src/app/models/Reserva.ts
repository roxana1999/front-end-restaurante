import { Time } from '@angular/common'
import { Mesa } from './Mesa'
import { Restaurante } from './Restaurante'
import { Cliente } from './Cliente'

export class Reserva {
    id: number
    restaurante: Restaurante
    mesa: Mesa
    fecha: Date
    horaInicio: Time
    horaFin: Time
    cliente: Cliente
    cantidadSolicitada: number

    constructor(id: number, restaurante: Restaurante, mesa: Mesa, fecha: Date, horaInicio: Time, horaFin: Time, cliente: Cliente, cantidadSolicitada: number) {
        this.id = id
        this.restaurante = restaurante
        this.mesa = mesa
        this.fecha = fecha
        this.horaInicio = horaInicio
        this.horaFin = horaFin
        this.cliente = cliente
        this.cantidadSolicitada = cantidadSolicitada
    }
}