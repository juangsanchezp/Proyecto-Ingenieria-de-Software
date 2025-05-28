import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',

})
export class SignupComponent {
  @ViewChild('nombreUsuarioInput') nombreUsuarioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('correoInput') correoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contrasenaInput') contrasenaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmacionInput') confirmacionInput!: ElementRef<HTMLInputElement>;

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const nombreUsuario = this.nombreUsuarioInput.nativeElement.value;
    const correo = this.correoInput.nativeElement.value;
    const contrasena = this.contrasenaInput.nativeElement.value;
    const confirmar = this.confirmacionInput.nativeElement.value;

    if (contrasena !== confirmar) {
      this.errorMessage = '❌ Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }

    const nuevoUsuario = {
      nombreUsuario,
      correo,
      contrasena
    };

    this.authService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.successMessage = '✅ Usuario registrado con éxito';
        this.errorMessage = '';
      },
      error: (err: any) => {
        this.errorMessage = '❌ El usuario ya existe o hubo un error.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
