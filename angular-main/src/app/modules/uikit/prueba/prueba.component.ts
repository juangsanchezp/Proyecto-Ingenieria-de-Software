import {Component, OnInit} from '@angular/core';
import { UsuarioService } from '/src/app/services/usuario.service'; // Ajusta la ruta según tu proyecto
import { Usuario } from '/src/app/models/usuario.model';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',

})
export class PruebaComponent implements OnInit {
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
