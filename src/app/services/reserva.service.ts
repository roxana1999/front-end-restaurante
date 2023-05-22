import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { DatosReserva, Reserva } from '../models/Reserva';
import { Mesa } from '../models/Mesa';



@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private api: string ="http://localhost:5000/reservas/";
  constructor(private http: HttpClient) { }

  getReservas(queryParams: {} = {}): Observable<listaDatos<Reserva>> {
    return this.http.get<listaDatos<Reserva>>(this.api, {params: queryParams});
  }
  
  getMesasDisponibles(queryParams: {} = {}): Observable<listaDatos<Mesa>> {
    return this.http.get<listaDatos<Mesa>>(this.api+"listarMesasDisponibles", {params: queryParams});
  }

  crearReserva(r: Reserva): Observable<DatosReserva> {
    return this.http
    .post<DatosReserva>(this.api+"crearReserva", r)
    .pipe(
      tap(
        {
          next: data => {console.log('agregado '+data)},
          error: err => console.log("error: "+err)
        }
      )
    );
  }

}
