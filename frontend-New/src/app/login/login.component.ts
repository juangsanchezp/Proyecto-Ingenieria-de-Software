import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuarioService } from '../shared/services/usuario.services';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports:[RouterLink]
})
export class LoginComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  successMessage = '';
  errorMessage = '';

  constructor(private usuarioService: UsuarioService ,
              private router:Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const loginData = {
      nombreUsuario: this.usernameInput.nativeElement.value,
      contrasena: this.passwordInput.nativeElement.value
    };

    this.usuarioService.login(loginData).subscribe({
      next: (res) => {
        this.successMessage = '✅ Inicio de sesión exitoso';
        this.errorMessage = '';

        // Limpia los campos opcionalmente

        this.passwordInput.nativeElement.value = '';

        //Estado de inicio de sesion igual a true
        this.usuarioService.setAuthenticated(true,loginData.nombreUsuario);

        // Redirige al usuario al home
        this.router.navigate(['/home']);

      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = '❌ Usuario o contraseña incorrecta';
      }
    });
  }
}
