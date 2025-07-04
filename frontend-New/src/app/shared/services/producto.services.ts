import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from "../models/producto.model";

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private baseUrl = 'http://localhost:8081/apiProductos'; // Cambia esto a la URL de tu API
  constructor(private http: HttpClient) {}

  getProducto(): Observable<Producto> {
    const url = `${this.baseUrl}/getUsuario`;
    return this.http.get<Producto>(url)
    //return this.http.getUsuario(this.apiUrl);
  }

    getProductos(): Observable<Producto[]> {
        const url = `${this.baseUrl}/getProductos`;
        return this.http.get<Producto[]>(url);
    }

    getProductoById(id: string): Observable<Producto> {
        const url = `${this.baseUrl}/getProducto/${id}`;  
        return this.http.get<Producto>(url);
    }

    

  // Otros métodos para crear, actualizar y eliminar productos...
}