export class Cliente {
    idCliente?: string
    nroDocumento: string
    nombres: string
    apellidos: string

    constructor(
        nroDocumento: string,
        nombres: string,
        apellidos: string
    ) {
        this.nroDocumento = nroDocumento
        this.nombres = nombres
        this.apellidos = apellidos
    }
}

export class datosCliente {
    estado?: string
    mensaje?: string
    datos?: Cliente
}