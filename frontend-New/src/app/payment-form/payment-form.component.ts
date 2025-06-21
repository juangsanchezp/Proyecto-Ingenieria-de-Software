import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup; // Use definite assignment assertion

  constructor() { }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/) // Basic pattern for card number
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) // MM/YY
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/) // 3 or 4 digits
      ]),
      country: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Form Submitted!', this.paymentForm.value);
      // Here you would typically send the data to your backend
    } else {
      console.log('Form is invalid');
      // Highlight invalid fields or show error messages
    }
  }
}