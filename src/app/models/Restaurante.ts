export class Restaurante {
    idRestaurante: string
    nombre: string
    direccion: string
    
    constructor(idRestaurante: string, nombre: string, direccion: string) {
        this.idRestaurante = idRestaurante
        this.nombre = nombre
        this.direccion = direccion
    }
}

export class DatosRestaurante {
    estado?: string
    mensaje?: string
    datos?: Restaurante
}