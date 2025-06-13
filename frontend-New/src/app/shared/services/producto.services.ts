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

    crearProducto(formData: FormData): Observable<Producto> {
        const url = `${this.baseUrl}/crearProducto`;
        return this.http.post<Producto>(url, formData);
    }

    getProductos(): Observable<Producto[]> {
        const url = `${this.baseUrl}/getProductos`;
        return this.http.get<Producto[]>(url);
    }

    getProductoById(id: string): Observable<Producto> {
        const url = `${this.baseUrl}/getProducto/${id}`;
        return this.http.get<Producto>(url);
    }

  actualizarProductoFormData(id: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/actualizarProducto/${id}`;
    return this.http.put(url, formData);
  }

  eliminarProducto(id: number): Observable<any> {
    const url = `${this.baseUrl}/eliminarProducto/${id}`;
    return this.http.delete(url);
  }



}
