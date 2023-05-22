import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Reserva } from 'src/app/models/Reserva';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent {
  listaReservas: Reserva[] = [];
  
  constructor(
    private servicioRestaurantes: RestauranteService, 
    private servicioClientes: ClienteService, 
    private servicioMesas: MesaService, 
    private servicioReservas: ReservaService) { }

  ngOnInit(): void {
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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

}
