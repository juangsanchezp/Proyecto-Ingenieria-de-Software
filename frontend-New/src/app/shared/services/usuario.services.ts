import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/apiUsuarios';

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

  // Puedes agregar aquí el método de login
}
