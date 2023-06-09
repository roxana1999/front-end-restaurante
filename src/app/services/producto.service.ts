import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosProducto, Producto } from '../models/Producto';
import { listaDatos } from '../models/ListaDatos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api: string ="http://localhost:5000/productos/";

  constructor(private http: HttpClient) { }

  getProductos(queryParams: {}={}): Observable<listaDatos<Producto>>{
    return this.http.get<listaDatos<Producto>>(this.api, {params: queryParams});
  }
  getProductoById(idProducto: number): Observable<DatosProducto> {
    return this.http.get<DatosProducto>(this.api+"productoByIdProducto/"+idProducto);
  }
}