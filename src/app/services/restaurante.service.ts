import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { DatosRestaurante, Restaurante } from '../models/Restaurante';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private api: string ="http://localhost:5000/restaurantes/";
  constructor(private http: HttpClient) { }

  getRestaurantes(queryParams: {}={}): Observable<listaDatos<Restaurante>> {
    return this.http.get<listaDatos<Restaurante>>(this.api, {params: queryParams});
  }

  getRestauranteById(queryParams: {}={}): Observable<DatosRestaurante> {
    return this.http.get<DatosRestaurante>(this.api+'restauranteById', {params: queryParams});
  }
}
