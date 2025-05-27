import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const loginData = {
      nombreUsuario: this.usernameInput.nativeElement.value,
      contrasena: this.passwordInput.nativeElement.value
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.successMessage = '✅ Inicio de sesión exitoso';
        this.errorMessage = '';

        // Limpia los campos opcionalmente
        this.usernameInput.nativeElement.value = '';
        this.passwordInput.nativeElement.value = '';
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = '❌ Usuario o contraseña incorrecta';
      }
    });
  }
}

