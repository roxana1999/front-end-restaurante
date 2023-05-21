export class Cliente {
    id: number
    cedula: number
    nombre: string
    apellido: string

    constructor(id: number, cedula: number, nombre: string, apellido: string) {
        this.id = id
        this.cedula = cedula
        this.nombre = nombre
        this.apellido = apellido
    }
}