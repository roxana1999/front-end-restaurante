import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Reserva } from 'src/app/models/Reserva';
import { Restaurante } from 'src/app/models/Restaurante';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent {
  listaReservas: Reserva[] = [];
  listaRestaurantes: Restaurante[] = [];
  idRestaurante?: number;
  selectedFecha?: Date;
  
  constructor(
    private servicioRestaurantes: RestauranteService, 
    private servicioClientes: ClienteService, 
    private servicioMesas: MesaService, 
    private servicioReservas: ReservaService) { }

  ngOnInit(): void {
    this.getReservas();
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

  getReservas(idRestaurante?: number | undefined, fechaReserva?: Date | undefined){
    this.servicioReservas.getReservas().subscribe({
      next: (entity) => {
        this.listaReservas= entity.datos;
        for (const item of this.listaReservas) {
          item.fechaReserva = item.fechaReserva.slice(0, 10);
          item.horaInicioReserva = this.transformarHora(item.horaInicioReserva);
          item.horaFinReserva = this.transformarHora(item.horaFinReserva);
          this.servicioClientes.getCliente({idCliente : item.idCliente}).subscribe({
            next: (entity) => {
              item.cliente = entity.datos;
            },
            error: (e) => console.log(e)
          });
          this.servicioMesas.getMesaById({idMesa : item.idMesa}).subscribe({
            next: (entity) => {
              item.mesa = entity.datos;
              this.servicioRestaurantes.getRestauranteById({idRestaurante : item.mesa?.idRestaurante}).subscribe({
                next: (entity) => {
                  item.restaurante = entity.datos;
                  console.log(item.restaurante)
                  /*if (idRestaurante == undefined && fechaReserva == undefined){
                    console.log("push reserva");
                    this.listaReservas.push(reserva);
                    console.log("LISTA FILTRADA",this.listaReservas);
                  }
                  else {
                    if (idRestaurante != undefined){
                      console.log("idRestaurante está definido")
                      if (item.restaurante?.idRestaurante == idRestaurante){
                        this.listaReservas.push(reserva);
                      }
                    }
                    else{
                      console.log("idRestaurante es undefined");
                    }
                  }*/
                },
                error: (e) => console.log(e)
              });
            },
            error: (e) => console.log(e)
          });
        }
      },
      error: (e) => console.log(e)
    });
  }

  transformarHora(hora: string){
    let date = new Date(hora);
    date.setHours(date.getHours() + 4);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  }

  filtrarReservas(){
    
  }

}
