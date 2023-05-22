import { Component, OnInit } from '@angular/core';
import { RangoHora } from 'src/app/models/RangoHora';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Restaurante } from 'src/app/models/Restaurante';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Mesa } from 'src/app/models/Mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { DatePipe } from '@angular/common';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/models/Reserva';


@Component({
  selector: 'app-reservar-mesa',
  templateUrl: './reservar-mesa.component.html',
  styleUrls: ['./reservar-mesa.component.css'],
  providers: [DatePipe]
})
export class ReservarMesaComponent implements OnInit {
  reservaCreada?: Reserva;
  listaMesasDisponibles : Mesa[] = [];
  listaRestaurantes : Restaurante[] = [];
  cliente?: Cliente;
  nroCedula = "";
  nombres = "";
  apellidos = "";
  clienteEncontrado = false;
  puedoSeleccionarMesa = false;
  listaRangoHoras : RangoHora[] =
  [
    new RangoHora(1, 12, 13),
    new RangoHora(2, 13, 14),
    new RangoHora(3, 14, 15),
    new RangoHora(4, 19, 20),
    new RangoHora(5, 20, 21),
    new RangoHora(6, 21, 22),
    new RangoHora(7, 22, 23)
  ]
  
  idRestaurante?: number;
  selectedHoras: RangoHora[] = [];
  selectedFecha?: Date;
  idMesa?: number;
  isFormComplete = false;

  constructor(
    private servicioRestaurantes: RestauranteService, 
    private servicioClientes: ClienteService, 
    private servicioMesas: MesaService, 
    private servicioReservas: ReservaService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes() {
    this.servicioRestaurantes.getRestaurantes().subscribe({
      next: (entity) => {
        this.listaRestaurantes = entity.datos;
      },
      error: (e) => console.log(e)
    });
  }

  getCliente(){
    console.log("get cliente con ci:", this.nroCedula);
    this.clienteEncontrado = false;
    if (this.nroCedula!="") {
      this.servicioClientes.getCliente({nroDocumento : this.nroCedula}).subscribe({
        next: (entity) => {
          this.cliente = entity.datos;
          console.log(this.cliente);
          if (this.cliente) {
            this.nombres = this.cliente.nombres;
            this.apellidos = this.cliente.apellidos;
            this.clienteEncontrado = true;
          }
          this.checkFormCompletion();
        },
        error: (e) => console.log(e)
      });
    }
    else{
      this.checkFormCompletion();
    }
  }

  onSelectionChange() {
    // Implement your validation logic here
    // For example, check if the selected options are adjacent
    const isValidSelection = this.checkIfAdjacentSelection();
    if (!isValidSelection) {
      // If the selection is not valid, reset the selectedHoras array
      this.selectedHoras = [];
    }
    this.checkFormCompletion();
  }

  checkIfAdjacentSelection(): boolean {
    // Implement your logic here based on your specific requirements
    // Sample logic: Check if the selected options are consecutive
    const selectedIndexes = this.selectedHoras.map(option => this.listaRangoHoras.indexOf(option));
    const sortedIndexes = selectedIndexes.sort((a, b) => a - b);

    for (let i = 1; i < sortedIndexes.length; i++) {
      if (sortedIndexes[i] - sortedIndexes[i - 1] !== 1) {
        return false;
      }
    }

    return true;
  }

  checkFormCompletion() {
    console.log("CHECK FORM COMPLETION");
    console.log("IdRestaurante",this.idRestaurante);
    console.log("SelectedFecha",this.selectedFecha );
    console.log("SelectedHoras",this.selectedHoras);
    console.log("Nombres",this.nombres);
    console.log("Apellidos",this.apellidos);
    console.log("NroCedula",this.nroCedula);
    console.log("IdMesa", this.idMesa);

    // Check if all parameters have been selected to select a table
    if(this.idRestaurante && this.selectedFecha && this.selectedHoras && this.selectedHoras.length > 0){
      this.puedoSeleccionarMesa=true;
      this.getMesasDisponibles();
    }
    else{
      this.puedoSeleccionarMesa=false;
    }
    
    // Check if all parameters have been selected to make a Reserva
    if (this.idMesa && this.idRestaurante && this.selectedFecha && this.selectedHoras && this.selectedHoras.length > 0 && this.nombres!='' && this.apellidos!='' && this.nroCedula!='') {
      this.isFormComplete = true;
    }
    else {
      this.isFormComplete = false;
    }
  }

  validarDatos() {
    // Call your function when the form is complete
    if (this.isFormComplete) {
      if (this.cliente == undefined){
        let nuevo_cliente = new Cliente(this.nroCedula, this.nombres, this.apellidos);
        this.servicioClientes.crearCliente(nuevo_cliente).subscribe(
          {
            next: (data) => {
              this.cliente = data.datos;
              console.log(this.cliente);
              this.hacerReserva();
            }, 
            error: (e) => {console.log(e)}
          }
        );
      }
      else {
        this.hacerReserva();
      }
    }
  }

  getMesasDisponibles(){
    let fechaReservaParsed = this.datePipe.transform(this.selectedFecha, 'yyyy-MM-dd')!;
    let horaInicioReserva = this.selectedHoras[0].desde+":00:00";
    let horaFinReserva = this.selectedHoras[this.selectedHoras.length - 1].hasta+":00:00";
    console.log(fechaReservaParsed, horaInicioReserva, horaFinReserva);
    let params = {
      fechaReserva: fechaReservaParsed,
      horaInicioReserva: horaInicioReserva,
      horaFinReserva: horaFinReserva,
      idRestaurante: this.idRestaurante
    }

    this.servicioReservas.getMesasDisponibles(params).subscribe(
      {
        next: (data) => {
          this.listaMesasDisponibles = data.datos;
          console.log(this.listaMesasDisponibles);
        }, 
        error: (e) => {console.log(e)}
      }
    );
  }

  hacerReserva(){
    let fechaReservaParsed = this.datePipe.transform(this.selectedFecha, 'yyyy-MM-dd')!;
    let horaInicioReserva = this.selectedHoras[0].desde+":00:00";
    let horaFinReserva = this.selectedHoras[this.selectedHoras.length - 1].hasta+":00:00";
    let reserva = new Reserva(this.idMesa!, fechaReservaParsed, horaInicioReserva, horaFinReserva, this.cliente!.idCliente!, '1');
    this.servicioReservas.crearReserva(reserva).subscribe(
      {
        next: (data) => {
          console.log(data);
          if (data.datos){
            this.reservaCreada = data.datos;
          }
        }, 
        error: (e) => {console.log(e)}
      }
    );
  }
}