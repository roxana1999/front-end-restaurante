import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listaDatos } from '../models/ListaDatos';
import { Mesa } from '../models/Mesa';


@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private api: string ="http://localhost:5000/mesas/mesaById";
  constructor(private http: HttpClient) { }

  getMesas(queryParams: {}={}): Observable<listaDatos<Mesa>> {
    console.log("queryparams", queryParams);
    return this.http.get<listaDatos<Mesa>>(this.api, {params: queryParams});
  }
  
}
