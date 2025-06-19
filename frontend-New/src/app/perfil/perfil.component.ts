import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/services/usuario.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare function initFlowbite(): void; // Si usas Flowbite

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true // Solo si es un componente standalone, si no, quítalo y usa AppModule
})
export class PerfilComponent implements OnInit {

  usuarioActual: any;
  editando = false;
  usuarioEditable: any = {};

  mensajeExito: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
    this.usuarioService.getUsuarioActual()?.subscribe(usuario => {
      this.usuarioActual = usuario;
    });
  }

  editar() {
    this.usuarioEditable = { ...this.usuarioActual };
    this.editando = true;

    this.mensajeExito = '';
  }

  cancelar() {
    this.editando = false;

    this.mensajeExito = '';
  }

  guardarCambios() {
    this.usuarioService.actualizarUsuario(this.usuarioEditable).subscribe(
      (response) => {
        this.usuarioActual = { ...this.usuarioEditable };
        this.editando = false;

        // Mostrar mensaje de éxito
        this.mensajeExito = '¡Perfil actualizado correctamente!';
        // Opcional: puedes limpiar el mensaje después de unos segundos
        setTimeout(() => this.mensajeExito = '', 2000);

      },
      (error) => {

        //mensaje de error
        this.mensajeExito = 'Ocurrió un error al actualizar el perfil.';
        setTimeout(() => this.mensajeExito = '', 2000);

      }
    );
  }
}
