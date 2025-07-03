import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../shared/services/carrito-productos.service'; // ajusta la ruta si cambia

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  confirmacionPagoForm!: FormGroup;
  archivoSeleccionado: File | null = null;
  intentoDeEnvio = false;
  mensajeExito: string = '';

  constructor(private carritoService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.confirmacionPagoForm = new FormGroup({
      titular: new FormControl('', Validators.required),
      banco: new FormControl('', Validators.required),
      numeroCuenta: new FormControl('', Validators.required),
      monto: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      fecha: new FormControl('', Validators.required),
      referencia: new FormControl('', Validators.required),
      comprobante: new FormControl(null, Validators.required)
    });
  }

  soloNumeros(event: KeyboardEvent) {
    const tecla = event.key;
    if (!/^\d$/.test(tecla)) {
      event.preventDefault();
    }
  }

  soloLetras(event: KeyboardEvent): void {
    const tecla = event.key;
    const letrasPermitidas = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/;
    if (!letrasPermitidas.test(tecla)) {
      event.preventDefault();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.confirmacionPagoForm.patchValue({ comprobante: file });
    }
  }

  onSubmit(): void {
    this.intentoDeEnvio = true;

    if (this.confirmacionPagoForm.valid) {
      console.log('✅ Datos enviados:', this.confirmacionPagoForm.value);
      this.mensajeExito = 'Pago confirmado correctamente.';

      // 🔁 Limpiar formulario
      this.confirmacionPagoForm.reset();
      this.archivoSeleccionado = null;
      this.intentoDeEnvio = false;

      // ✅ Vaciar carrito
      this.carritoService.clearCart();

      // ⏱ Ocultar mensaje y redirigir a /home
      setTimeout(() => {
        this.mensajeExito = '';
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      console.warn('❌ Formulario inválido');
      this.confirmacionPagoForm.markAllAsTouched();
    }
  }
}







