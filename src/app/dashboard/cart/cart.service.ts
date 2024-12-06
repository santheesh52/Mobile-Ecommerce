import { Injectable } from '@angular/core';
import { Product, CartItem } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addProduct(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.selectedQuantity += 1;
      existingProduct.totalPrice = existingProduct.selectedQuantity * existingProduct.price;
    } else {
      const newCartItem: CartItem = {
        ...product,
        qty: 1,
        seller: 'Unknown Seller',
        selectedQuantity: 1,
        totalPrice: product.price,
        dropdownVisible: false
      };
      this.cartItems.push(newCartItem);
    }
  }

  updateCartItems(items: CartItem[]): void {
    this.cartItems = items;
  }
}
