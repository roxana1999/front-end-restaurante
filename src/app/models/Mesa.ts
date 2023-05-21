import { Restaurante } from "./Restaurante"

export class Mesa {
    id: number
    nombre: string
    restaurante: Restaurante
    posX: number
    posY: number
    capacidad: number
    estado: string

    constructor(id: number, nombre: string, restaurante: Restaurante, posX: number, posY: number, capacidad: number, estado: string) {
        this.id = id
        this.nombre = nombre
        this.restaurante = restaurante
        this.posX = posX
        this.posY = posY
        this.capacidad = capacidad
        this.estado = estado
    }
}