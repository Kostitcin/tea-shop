import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../../shared/services/product.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  productName: string = '';
  orderForm!: FormGroup;
  isSubmitted = false;
  submissionError = false;

  constructor(private productService: ProductService, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.productName = localStorage.getItem('productName') || this.productService.getProductName()!;
    this.orderForm = this.fb.group({
      product: [{ value: this.productName, disabled: true }],
      comment: [''],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я\s]+$/)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я0-9\s\-\/]+$/)]]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.http.post('https://testologia.ru/order-tea', this.orderForm.getRawValue()).subscribe({
        next: (response: any) => {
          if (response.success === 1) {
            this.isSubmitted = true;
            this.submissionError = false;
            this.orderForm.reset();
            localStorage.removeItem('productName');
          } else {
            this.isSubmitted = false;
            this.submissionError = true;
          }
        },
        error: () => {
          this.isSubmitted = false;
          this.submissionError = true;
        }
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
