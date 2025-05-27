import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { UsuarioService } from '../shared/services/usuario.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, CommonModule],
})
export class SignupComponent implements OnInit {

  usuario: Usuario = {
    correo: '',
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    contrasena: ''
  };
  confirmarContrasena: string = '';
  error: string = '';
  exito: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    initFlowbite();
  }

  validateEmail(): void {
    this.emailError = '';
    if (this.usuario.correo && !this.usuario.correo.includes('@')) {
      this.emailError = 'El correo electrónico debe contener al menos un "@"';
    }
  }

  onSubmit(): void {
    this.error = '';
    this.exito = '';
    this.passwordError = '';

    // Validaciones básicas
    if (!this.usuario.nombreUsuario || !this.usuario.correo || !this.usuario.contrasena) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.usuario.contrasena !== this.confirmarContrasena) {
      this.passwordError = 'Las contraseñas no coinciden.';
      return;
    }

    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: () => {
        this.exito = 'Usuario registrado exitosamente.';
      },
      error: () => {
        this.error = 'Error al registrar el usuario.';
      }
    });
  }
}
