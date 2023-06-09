import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { Mesa } from '../models/Mesa';
import { DatosBase64, DatosCabecera, DatosConsumicionMesa, DatosDetalle, Detalle } from '../models/GestionConsumo';

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

  cerrarMesa(idMesa: number): Observable<DatosCabecera> {
    return this.http.get<DatosCabecera>(this.api+"cerrarMesa/"+idMesa);
  }

  getStringBase64(idCabecera: number): Observable<DatosBase64> {
    return this.http.get<DatosBase64>(this.api+"getStringBase64/"+idCabecera);
  }
}
