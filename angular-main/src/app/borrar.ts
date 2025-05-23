import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service'; // Ajusta la ruta según tu proyecto
import { Usuario } from './models/usuario.model'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe({
      next: (usuario: Usuario) => {
        console.log('Usuario recibido:', usuario);
      },
      error: (err) => {
        console.error('Error al obtener el usuario', err);
      }
    });
  }
}
