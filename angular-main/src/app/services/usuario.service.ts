import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from "src/app/models/usuario.model";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private baseUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const url = `${this.baseUrl}/getUsuario`;
    return this.http.get<Usuario>(url)
    //return this.http.getUsuario(this.apiUrl);
  }


  // Otros métodos para crear, actualizar y eliminar productos...
}

