import { Restaurante } from "./Restaurante"

export class Mesa {
    id_mesa: number
    nombre_mesa: string
    id_restaurante: string
    posicion_x: number
    posicion_y: number
    capacidad_x_mesa: number
    estado: string

    constructor(
        id_mesa: number,
        nombre_mesa: string,
        id_restaurante: string,
        posicion_x: number,
        posicion_y: number,
        capacidad_x_mesa: number,
        estado: string
    ) {
        this.id_mesa = id_mesa
        this.nombre_mesa = nombre_mesa
        this.id_restaurante = id_restaurante
        this.posicion_x = posicion_x
        this.posicion_y = posicion_y
        this.capacidad_x_mesa = capacidad_x_mesa
        this.estado = estado
    }
}