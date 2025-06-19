import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import {Producto} from '../models/producto.model';

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
  getIdUsuario(): string {
    return this.idUsuario;
  }

  getUsuarioActual():  Observable<Usuario>  {
    const url = `${this.apiUrl}/buscarUsuario/${this.idUsuario}`;
    return this.http.get<Usuario>(url) ; // Retorna un objeto Usuario
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/actualizarUsuario/${usuario.nombreUsuario}`;
    return this.http.put<Usuario>(url, usuario);
  }

}
