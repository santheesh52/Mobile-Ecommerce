import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { Product, CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];  
  quantityOptions: number[] = [1, 2, 3, 4, 5, 10]; 
  public FinaltotalPrice: number = 0;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice(); // Calculate total on initial load
  }

  private loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems().map(item => ({
      ...item,
      selectedQuantity: item.selectedQuantity || 1, // Default quantity
      totalPrice: item.price, // Set initial total price
      dropdownVisible: false // Initialize dropdown visibility
    }));
    this.calculateTotalPrice(); // Ensure total price is accurate on load
    console.log('Cart items:', this.cartItems);
  }

  proceedToBuy(items: CartItem[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/payment'], { state: { products: items } });
    } else {
      console.error("No items to proceed with");
    }
  }

  deleteItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.cartService.updateCartItems(this.cartItems);
    this.calculateTotalPrice(); // Update total price after deleting item
    console.log('Deleted item:', item);
  }

  saveForLater(item: CartItem): void {
    console.log('Saved for later:', item);
  }

  viewSimilarProducts(item: CartItem): void {
    alert(`Showing similar products for: ${item.name}`);
  }

  shareItem(item: CartItem): void {
    alert(`Sharing item: ${item.name}`);
  }

  toggleDropdown(item: CartItem): void {
    item.dropdownVisible = !item.dropdownVisible;
  }

  // Update selected quantity for the item and recalculate total
  selectQuantity(item: CartItem, quantity: number): void {
    item.selectedQuantity = quantity;
    item.totalPrice = item.selectedQuantity * item.price; // Update total price for this item
    item.dropdownVisible = false;
    this.cartService.updateCartItems(this.cartItems); 
    this.calculateTotalPrice(); // Recalculate overall total price
  }
  
  // Calculate overall total price
  calculateTotalPrice(): void {
    this.FinaltotalPrice = this.cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.loadCartItems();
    this.calculateTotalPrice(); // Update total price after adding a new product
  }
}
