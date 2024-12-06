export interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  imageUrl: string;
  rating?: number;
  deliveryTime: {
    standard: string;
    fastest?: string;
  };
  cellularTechnology: string;
  ramSize: number;
}

export interface CartItem extends Product {
  qty: any;  
  seller: any;  
  selectedQuantity: number;  
  totalPrice: number;  
  dropdownVisible: boolean;  
}
