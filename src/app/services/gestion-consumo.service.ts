import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { Mesa } from '../models/Mesa';
import { DatosConsumicionMesa, DatosDetalle, Detalle } from '../models/GestionConsumo';

@Injectable({
  providedIn: 'root'
})
export class GestionConsumoService {
  private api: string ="http://localhost:5000/consumos/";

  constructor(private http: HttpClient) { }

  verificarMesa(idMesa: number): Observable<DatosConsumicionMesa> {
    return this.http.get<DatosConsumicionMesa>(this.api+"verificarMesa/"+idMesa);
  }

  insertarDetalle(d: Detalle): Observable<DatosDetalle> {
    return this.http
    .post<DatosDetalle>(this.api+"insertarDetalle/", d)
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
