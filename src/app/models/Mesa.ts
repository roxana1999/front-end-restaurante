import { Restaurante } from "./Restaurante"

export class Mesa {
    idMesa: number
    nombreMesa: string
    idRestaurante: string
    posicionX: number
    posicionY: number
    capacidadPorMesa: number
    estado: string

    constructor(
        idMesa: number,
        nombreMesa: string,
        idRestaurante: string,
        posicionX: number,
        posicionY: number,
        capacidadPorMesa: number,
        estado: string
    ) {
        this.idMesa = idMesa
        this.nombreMesa = nombreMesa
        this.idRestaurante = idRestaurante
        this.posicionX = posicionX
        this.posicionY = posicionY
        this.capacidadPorMesa = capacidadPorMesa
        this.estado = estado
    }
}

export class DatosMesa {
    estado?: string
    mensaje?: string
    datos?: Mesa
}