import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../../models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentStep = 1; 
  paymentForm!: FormGroup;
  addressForm!: FormGroup;

  cartItems: CartItem[] = [];

  deliveryOptions = [
    { date: 'Sunday', cost: 40.0 },
    { date: 'Monday', cost: 0.0 },
  ];

  selectedDeliveryOption = this.deliveryOptions[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems().map(item => ({
      ...item,
      selectedQuantity: item.selectedQuantity || 1, 
      totalPrice: item.price * (item.selectedQuantity || 1),
      dropdownVisible: false
    }));
  }

  initForms(): void {
    this.addressForm = this.fb.group({
      addressLine: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      upiId: ['', Validators.pattern(/^.+@.+$/)],
    });
  }

  moveToNextStep(): void {
    switch (this.currentStep) {
      case 1:
        if (this.addressForm.valid) {
          this.currentStep++;
        } else {
          alert('Please fill out the address details correctly.');
        }
        break;
      case 2:
        if (this.paymentForm.valid) {
          this.currentStep++;
        } else {
          alert('Please fill out the payment details correctly.');
        }
        break;
      default:
        alert('Invalid step navigation.');
        break;
    }
  }

  resetStepper(): void {
    this.currentStep = 1;
    this.addressForm.reset();
    this.paymentForm.reset();
  }

placeOrder(): void {
  if (this.currentStep !== 3) {
    alert('Please complete all steps before placing your order.');
    return;
  }

  console.log('Order details:', {
    items: this.cartItems.map(item => ({
      name: item.name,
      quantity: item.selectedQuantity,
      price: item.price,
      total: (item.price * item.selectedQuantity).toFixed(2),
    })),
    totalAmount: this.calculateTotal().toFixed(2),
  });

  alert('Your order has been successfully placed!');
  this.resetStepper();
}

  resetForms(): void {
    this.currentStep = 1;
    this.addressForm.reset();
    this.paymentForm.reset();
    this.selectedDeliveryOption = this.deliveryOptions[0];
  }

  selectDeliveryOption(option: { date: string; cost: number }): void {
    this.selectedDeliveryOption = option;
  }

  calculateTotal(): number {
    const itemsTotal = this.cartItems.reduce(
    (total, item) => total + item.price * item.selectedQuantity,0);
    return itemsTotal + this.selectedDeliveryOption.cost;
  }
}
