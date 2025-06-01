import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/apiUsuarios';
  private autenticado: boolean = false; // Variable para controlar el estado de autenticación
  private idUsuario: string="";// Nombre del usuario que ha iniciado sesion

  constructor(private http: HttpClient) {}

  registrar(data: { nombreUsuario: string; correo: string; contrasena: string }): Observable<any> {
    return this.http.post('http://localhost:8081/apiUsuarios/registrarUsuario', data, {
      responseType: 'text'
    });
  }

  // POST típico para login (ajústalo a tu lógica)
  login(data: { nombreUsuario: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.autenticado;
  }

  // Método para establecer el estado de autenticación
  setAuthenticated(estado: boolean, nombreUsu: string): void {
    this.autenticado = estado;
    this.idUsuario= nombreUsu; // Guarda el nombre del usuario autenticado
  }
  cerrarSesion(): void {
    this.idUsuario="";
    this.autenticado=false;
  }

}
