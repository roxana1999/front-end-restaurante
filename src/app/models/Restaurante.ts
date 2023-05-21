export class Restaurante {
    idRestaurante: number;
    nombre: string;
    direccion: string;
    
    constructor(idRestaurante: number, nombre: string, direccion: string) {
        this.idRestaurante = idRestaurante;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}