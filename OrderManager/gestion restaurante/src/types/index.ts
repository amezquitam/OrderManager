// User related types
export type UserRole = 'admin' | 'cook' | 'waiter';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
}

// Restaurant related types
export interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  address: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  operatingHours: OperatingHour[];
}

// Product related types
export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductRating {
  userId: string;
  rating: number;
  comment?: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  isAvailable: boolean;
  ratings: ProductRating[];
}

// Order related types
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  tableId?: string;
  createdAt: string;
  readyAt?: string;
  deliveredAt?: string;
  paymentStatus?: 'pending' | 'paid';
}

// Table related types
export interface TableItem {
  id: string;
  number: number;
  capacity: number;
  isOccupied: boolean;
  currentOrderId?: string;
}

// Inventory related types
export type UnitOfMeasure = 'kg' | 'g' | 'l' | 'ml' | 'unit' | 'box';

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  category: string;
  unit: UnitOfMeasure;
  stock: number;
  minStock: number;
  supplierId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  products: string[];
}

// Promotion related types
export interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  productIds: string[];
  isActive: boolean;
}