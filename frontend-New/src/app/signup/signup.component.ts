import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuarioService } from '../shared/services/usuario.services';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports:[RouterLink],
  templateUrl: './signup.component.html',

})
export class SignupComponent {
  @ViewChild('nombreUsuarioInput') nombreUsuarioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('correoInput') correoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contrasenaInput') contrasenaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmacionInput') confirmacionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nombreInput') nombreInput!: ElementRef<HTMLInputElement>;
  @ViewChild("apellidoInput") apellidoInput!: ElementRef<HTMLInputElement>;

  successMessage = '';
  errorMessage = '';

  constructor(private usuarioService: UsuarioService ,
              private router:Router) {}


  // Método para manejar el envío del formulario
  onSubmit(event: Event): void {
    event.preventDefault();

    const nombreUsuario = this.nombreUsuarioInput.nativeElement.value;
    const correo = this.correoInput.nativeElement.value;
    const nombre:string= this.nombreInput.nativeElement.value;
    const apellido:string= this.apellidoInput.nativeElement.value;
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
      ,nombre,
      apellido,
    };

    this.usuarioService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.successMessage = '✅ Usuario registrado con éxito';
        this.errorMessage = '';


        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);


      },
      error: (err: any) => {
        this.errorMessage = '❌ El usuario ya existe o hubo un error.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
