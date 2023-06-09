import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { DatosMesa, Mesa } from '../models/Mesa';


@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private api: string ="http://localhost:5000/mesas/";
  constructor(private http: HttpClient) { }

  getMesaById(queryParams: {}={}): Observable<DatosMesa> {
    return this.http.get<DatosMesa>(this.api+"mesaById", {params: queryParams});
  }

  getMesas(queryParams: {}={}): Observable<listaDatos<Mesa>>{
    return this.http.get<listaDatos<Mesa>>(this.api, {params: queryParams});
  }
  
}
