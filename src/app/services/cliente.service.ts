import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { Cliente, datosCliente } from '../models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private api: string ="http://localhost:5000/clientes/";
  constructor(private http: HttpClient) { }

  getCliente(queryParams: {} = {}): Observable<datosCliente> {
    return this.http.get<datosCliente>(this.api+"clienteByNroDocumento", {params: queryParams});
  }

  crearCliente(c: Cliente): Observable<datosCliente> {
    return this.http
    .post<datosCliente>(this.api+"crearCliente", c)
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
