import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { MessageService } from 'primeng/api';

interface User {
  username: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  imageUrl: string;
  rating?: number; 
  deliveryTime: {
    standard: string;
    fastest?: string; // Optional fastest delivery date
  };
  cellularTechnology: string;
  ramSize: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})

export class HomeComponent {
  title = 'Welcome to Our E-Commerce Store!';
  searchTerm: string = '';

  mobileNames = [
    { name: 'Samsung', selected: false },
    { name: 'Apple', selected: false },
    { name: 'OnePlus', selected: false },
    { name: 'Xiaomi', selected: false },
    { name: 'Google', selected: false },
    { name: 'Sony', selected: false },
    { name: 'Huawei', selected: false },
    { name: 'Realme', selected: false }
  ];

  ratings = [
    { label: '4 Stars & Up', value: 4, selected: false },
    { label: '3 Stars & Up', value: 3, selected: false },
    { label: '2 Stars & Up', value: 2, selected: false }
  ];

  priceRanges = [
    { label: 'Under ₹10,000', minPrice: 0, maxPrice: 9999, selected: false },
    { label: '₹10,000 - ₹20,000', minPrice: 10000, maxPrice: 20000, selected: false },
    { label: '₹20,000 - ₹30,000', minPrice: 20000, maxPrice: 30000, selected: false },
    { label: '₹30,000 - ₹40,000', minPrice: 20000, maxPrice: 30000, selected: false },
    { label: '₹40,000 - ₹50,000', minPrice: 40000, maxPrice: 50000, selected: false },
    { label: '₹50,000 - ₹60,000', minPrice: 40000, maxPrice: 50000, selected: false },
    { label: '₹60,000 - ₹70,000', minPrice: 40000, maxPrice: 50000, selected: false },
    { label: '₹70,000 - ₹80,000', minPrice: 40000, maxPrice: 50000, selected: false },
    { label: '₹80,000 - ₹90,000', minPrice: 40000, maxPrice: 50000, selected: false },
    { label: 'Above ₹1,00,000', minPrice: 100000, maxPrice: 0, selected: false },
  ];

  cellularTechnologies = [
    { name: '4G', selected: false },
    { name: '5G', selected: false },
    // Add other technologies if needed...
  ];
  
  ramSizes = [
    { label: '4 GB', size: 4, selected: false },
    { label: '6 GB', size: 6, selected: false },
    { label: '8 GB', size: 8, selected: false },
    // Add other RAM sizes if needed...
  ];

  products: Product[] = [
    { id: 1, name: 'Apple iPhone', description: 'Apple iPhone 16 (128 GB) - Black',originalPrice: 10999, price: 134900, imageUrl: 'assets/iphone.jpg', rating: 5, deliveryTime: {standard: 'Thu, 14 Nov',fastest: 'Tomorrow, 9 Nov'} ,cellularTechnology: '5G',ramSize: 8},
    { id: 2, name: 'Samsung', description: 'Samsung Galaxy M55s 5G (Coral Green, 8GB RAM, 128GB Storage)',originalPrice: 10999, price: 139900, imageUrl: 'assets/galaxy.jpg', rating: 4,deliveryTime: {standard: 'Wed, 13 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '4G',ramSize: 4 },
    { id: 3, name: 'Google Pixel', description: 'Google Pixel 7a 5G (Coral, 8GB RAM, 128GB Storage)',originalPrice: 10999, price: 8900, imageUrl: 'assets/pixel.jpg', rating: 4 ,deliveryTime: {standard: 'Thu, 14 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '5G',ramSize: 8},
    { id: 4, name: 'OnePlus Nord', description: 'OnePlus Nord CE4 (Dark Chrome, 8GB RAM, 128GB Storage)',originalPrice: 10999, price: 69900, imageUrl: 'assets/oneplus.jpg', rating: 4,deliveryTime: {standard: 'Wed, 13 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '4G',ramSize: 6},
    { id: 5, name: 'Sony Xperia', description: 'Sony Xperia (Mega Blue, 8GB RAM, 128GB Storage)',originalPrice: 10999, price: 89900, imageUrl: 'assets/xperia.jpg', rating: 3 ,deliveryTime: {standard: 'Mon, 11 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '5G',ramSize: 8},
    { id: 6, name: 'Xiaomi 14', description: 'Xiaomi 14 (Jade Green, 12GB RAM, 512GB Storage)',originalPrice: 10999, price: 75900, imageUrl: 'assets/xiaomi.jpg', rating: 5,deliveryTime: {standard: 'Fri, 15 Nov',fastest: 'Tomorrow, 9 Nov'} ,cellularTechnology: '5G',ramSize: 8},
    { id: 7, name: 'Oppo F27', description: 'OPPO F27 Pro+ 5G (Midnight Navy, 8GB RAM, 256GB Storage)', originalPrice: 10999,price: 72900, imageUrl: 'assets/oppo.jpg', rating: 4,deliveryTime: {standard: 'Wed, 13 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '5G',ramSize: 8  },
    { id: 8, name: 'Huawei HONOR', description: 'HONOR 200 5G (Black, 8GB + 256GB)',originalPrice: 10999, price: 81900, imageUrl: 'assets/huawei.jpg', rating: 4,deliveryTime: {standard: 'Wed, 13 Nov',fastest: 'Tomorrow, 9 Nov'} ,cellularTechnology: '4G',ramSize: 8},
    { id: 9, name: 'Realme NARZO', description: 'realme NARZO 70 Pro 5G (Glass Gold, 8GB RAM, 256GB Storage)',originalPrice: 10999, price: 55900, imageUrl: 'assets/realme.jpg', rating: 3,deliveryTime: {standard: 'Wed, 13 Nov',fastest: 'Tomorrow, 9 Nov'},cellularTechnology: '5G',ramSize: 8}
    ];

  filteredProducts = this.products;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  cart: Product[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  filterProducts(): void {
    const selectedMobileNames = this.mobileNames.filter(mobile => mobile.selected).map(mobile => mobile.name);
    const selectedRatings = this.ratings.filter(rating => rating.selected).map(rating => rating.value);
    const selectedPriceRanges = this.priceRanges.filter(range => range.selected);
    const selectedTechnologies = this.cellularTechnologies.filter(tech => tech.selected).map(tech => tech.name);
    const selectedRamSizes = this.ramSizes.filter(ram => ram.selected).map(ram => ram.size);
  
    this.filteredProducts = this.products.filter(product => {
      // Check if product matches selected brand(s)
      const matchesMobile = selectedMobileNames.length === 0 || selectedMobileNames.some(name => product.name.includes(name));
  
      // Check if product matches selected rating(s)
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => (product.rating ?? 0) >= rating);
  
      // Check if product matches selected price range(s)
      const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => 
        (range.maxPrice === 0 && product.price >= range.minPrice) || 
        (product.price >= range.minPrice && product.price <= range.maxPrice)
      );
  
      // Check if product matches selected cellular technology
      const matchesTechnology = selectedTechnologies.length === 0 || selectedTechnologies.includes(product.cellularTechnology);
  
      // Check if product matches selected RAM size(s)
      const matchesRam = selectedRamSizes.length === 0 || selectedRamSizes.includes(product.ramSize);
  
      // Check if product matches search term
      const matchesSearch = this.searchTerm === '' || product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      return matchesMobile && matchesRating && matchesPrice && matchesTechnology && matchesRam && matchesSearch;
    });
  }
  
  
  
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${product.name} has been added to your cart`,
      key: 'cartToast'
    });
  }
  
}
