import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  imageUrl: string;
  rating?: number; // Optional
  deliveryTime: {
    standard: string;
    fastest?: string; // Optional
  };
  cellularTechnology: string;
  ramSize: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  searchTerm: string = '';
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

  filteredProducts: Product[] = [...this.products];

  mobileNames = [
    { name: 'Samsung', selected: false },
    { name: 'Apple', selected: false },
    { name: 'OnePlus', selected: false },
    { name: 'Xiaomi', selected: false },
  ];

  ratings = [
    { label: '4 Stars & Up', value: 4, selected: false },
    { label: '3 Stars & Up', value: 3, selected: false },
    { label: '2 Stars & Up', value: 2, selected: false },
  ];

  constructor(private router: Router) {}

  filterProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
  
    // Start with the full product list
    this.filteredProducts = this.products.filter((product) => {
      // Match the search term in the product name or description
      const matchesSearchTerm =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
  
      // Check selected brands
      const selectedBrands = this.mobileNames
        .filter((brand) => brand.selected)
        .map((brand) => brand.name.toLowerCase());
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.name.toLowerCase());
  
      // Check selected rating
      const selectedRating = this.ratings.find((rating) => rating.selected)?.value;
      const matchesRating =
        !selectedRating || (product.rating ?? 0) >= selectedRating;
  
      // Combine all conditions
      return matchesSearchTerm && matchesBrand && matchesRating;
    });
  
    console.log('Filtered Products:', this.filteredProducts);
  }

  
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
