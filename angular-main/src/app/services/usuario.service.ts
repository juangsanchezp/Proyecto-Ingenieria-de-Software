import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from "src/app/models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/products';
  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    //return this.http.getUsuario(this.apiUrl);
    return this.http.get<Usuario>(this.apiUrl)
  }

  // Otros métodos para crear, actualizar y eliminar productos...
}

