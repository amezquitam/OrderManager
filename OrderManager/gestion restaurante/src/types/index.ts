export type UserRole = 'admin' | 'cook' | 'waiter' | 'user';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: { id: string; role: UserRole };
  active: boolean;
  verified: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  gmapsLocation: string;
  address: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  active: boolean;
}

export interface OrderWithProducts {
  id: string;
  client: { id: string };
  status: string;
  timestamp: string;
  products: { product: Product; quantity: number }[];
  restaurant: Restaurant;
  table: TableEntity;
}

export interface Schedule {
  id: string;
  restaurant: { id: string };
  weekday: string;
  openingHour: number;
  closingHour: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
  restaurant: { id: string };
}

export interface Rating {
  id: string;
  user: { id: string };
  product: { id: string };
  rating: number;
  comment: string;
}

export interface ProductIngredient {
  id: string;
  product: { id: string };
  ingredient: { id: string };
  quantity: number;
}

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
}

export interface Supplier {
  id: string;
  name: string;
  restaurant: { id: string };
}

export interface Purchase {
  id: string;
  supplier: { id: string };
  date: string; // YYYY-MM-DD
}

export interface PurchaseIngredient {
  id: string;
  ingredient: { id: string };
  purchase: { id: string };
  quantity: number;
}

export interface Promotion {
  id: string;
  product: { id: string };
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  visible: boolean;
}

export interface Order {
  id: string;
  client: { id: string };
  status: string;
  timestamp: string; // ISO-8601
  table: TableEntity;
}

export interface OrderDetail {
  id: string;
  product: { id: string };
  order: { id: string };
  quantity: number;
}

export interface Payment {
  id: string;
  order: { id: string };
  timestamp: string; // ISO-8601
  amount: number;
  paymentMethod: string;
  invoiceUrl: string;
}

export interface TableEntity {
  id: string;
  name: string;
  restaurant: { id: string };
}

export interface UserRestaurantRole {
  id: string;
  user: { id: string };
  restaurant: { id: string };
  role: UserRole;
}
