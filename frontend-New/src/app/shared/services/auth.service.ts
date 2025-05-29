import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/apiUsuarios'; // Ajusta si tu backend está en otro puerto

  constructor(private http: HttpClient) {}

  // GET temporal para prueba
  getUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUsuario`);
  }

  // POST típico para login (ajústalo a tu lógica)
  login(data: { nombreUsuario: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  registrar(data: { nombreUsuario: string; correo: string; contrasena: string }): Observable<any> {
  return this.http.post('http://localhost:8081/apiUsuarios/registrar', data, {
    responseType: 'text'
  });
}
}
