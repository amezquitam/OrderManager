import { v4 as uuidv4 } from 'uuid';
import { 
  Restaurant, User, Product, Order, TableItem, 
  Ingredient, Supplier, Promotion, OperatingHour 
} from '../types';

// Define sample operation hours
const defaultOperatingHours: OperatingHour[] = [
  { day: 'Monday', open: '08:00', close: '20:00', isOpen: true },
  { day: 'Tuesday', open: '08:00', close: '20:00', isOpen: true },
  { day: 'Wednesday', open: '08:00', close: '20:00', isOpen: true },
  { day: 'Thursday', open: '08:00', close: '20:00', isOpen: true },
  { day: 'Friday', open: '08:00', close: '22:00', isOpen: true },
  { day: 'Saturday', open: '09:00', close: '22:00', isOpen: true },
  { day: 'Sunday', open: '10:00', close: '18:00', isOpen: true },
];

export const initializeData = () => {
  // Create sample restaurants
  const restaurants: Restaurant[] = [
    {
      id: uuidv4(),
      name: 'Delicious Bistro',
      image: 'https://images.pexels.com/photos/6126967/pexels-photo-6126967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: '40.7128,-74.0060', // NYC coordinates
      address: '123 Main Street, New York, NY 10001',
      instagram: 'deliciousbistro',
      facebook: 'deliciousbistro',
      whatsapp: '+1234567890',
      operatingHours: defaultOperatingHours,
    }
  ];

  // Create sample users
  const users: User[] = [
    {
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'admin123', // In a real app, this would be hashed
      role: 'admin',
      isActive: true,
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: uuidv4(),
      name: 'Chef Mario',
      email: 'chef@restaurant.com',
      password: 'chef123', // In a real app, this would be hashed
      role: 'cook',
      isActive: true,
      avatar: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: uuidv4(),
      name: 'Waiter John',
      email: 'waiter@restaurant.com',
      password: 'waiter123', // In a real app, this would be hashed
      role: 'waiter',
      isActive: true,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  ];

  // Create sample suppliers
  const suppliers: Supplier[] = [
    {
      id: uuidv4(),
      name: 'Fresh Produce Inc.',
      contact: 'Sarah Johnson',
      phone: '123-456-7890',
      email: 'contact@freshproduce.com',
      products: ['Vegetables', 'Fruits', 'Herbs'],
    },
    {
      id: uuidv4(),
      name: 'Meat Masters',
      contact: 'Bob Miller',
      phone: '234-567-8901',
      email: 'sales@meatmasters.com',
      products: ['Beef', 'Poultry', 'Pork'],
    }
  ];

  // Create sample ingredients
  const ingredients: Ingredient[] = [
    {
      id: uuidv4(),
      name: 'Tomatoes',
      description: 'Fresh ripe tomatoes',
      category: 'Vegetables',
      unit: 'kg',
      stock: 20,
      minStock: 5,
      supplierId: suppliers[0].id,
    },
    {
      id: uuidv4(),
      name: 'Chicken Breast',
      description: 'Boneless chicken breast',
      category: 'Meat',
      unit: 'kg',
      stock: 15,
      minStock: 3,
      supplierId: suppliers[1].id,
    },
    {
      id: uuidv4(),
      name: 'Lettuce',
      description: 'Fresh green lettuce',
      category: 'Vegetables',
      unit: 'kg',
      stock: 10,
      minStock: 2,
      supplierId: suppliers[0].id,
    },
    {
      id: uuidv4(),
      name: 'Olive Oil',
      description: 'Extra virgin olive oil',
      category: 'Condiments',
      unit: 'l',
      stock: 5,
      minStock: 1,
    }
  ];

  // Create sample products
  const products: Product[] = [
    {
      id: uuidv4(),
      name: 'Chicken Caesar Salad',
      description: 'Fresh lettuce with grilled chicken, parmesan, and Caesar dressing',
      price: 12.99,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Salads',
      ingredients: [ingredients[1].id, ingredients[2].id, ingredients[3].id],
      isAvailable: true,
      ratings: [
        {
          userId: users[2].id,
          rating: 4.5,
          comment: 'Delicious and fresh!',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        }
      ],
    },
    {
      id: uuidv4(),
      name: 'Spaghetti Bolognese',
      description: 'Classic pasta with rich meat sauce and parmesan',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Pasta',
      ingredients: [ingredients[0].id, ingredients[3].id],
      isAvailable: true,
      ratings: [
        {
          userId: users[1].id,
          rating: 5,
          comment: 'Just like my Italian grandmother used to make!',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        }
      ],
    }
  ];

  // Create sample tables
  const tables: TableItem[] = [
    {
      id: uuidv4(),
      number: 1,
      capacity: 2,
      isOccupied: false,
    },
    {
      id: uuidv4(),
      number: 2,
      capacity: 4,
      isOccupied: false,
    },
    {
      id: uuidv4(),
      number: 3,
      capacity: 6,
      isOccupied: true,
    }
  ];

  // Create sample orders
  const orders: Order[] = [
    {
      id: uuidv4(),
      customerName: 'John Smith',
      items: [
        {
          productId: products[0].id,
          quantity: 1,
          price: products[0].price,
        }
      ],
      totalAmount: products[0].price,
      status: 'delivered',
      tableId: tables[0].id,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      readyAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
      deliveredAt: new Date(Date.now() - 1.3 * 60 * 60 * 1000).toISOString(), // 1.3 hours ago
      paymentStatus: 'paid',
    },
    {
      id: uuidv4(),
      customerName: 'Emily Davis',
      items: [
        {
          productId: products[1].id,
          quantity: 2,
          price: products[1].price,
          notes: 'Extra cheese please',
        }
      ],
      totalAmount: products[1].price * 2,
      status: 'preparing',
      tableId: tables[2].id,
      createdAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), // 30 minutes ago
      paymentStatus: 'pending',
    }
  ];

  // Create sample promotions
  const promotions: Promotion[] = [
    {
      id: uuidv4(),
      title: 'Happy Hour',
      description: '20% off all items between 4-6pm',
      startDate: new Date(Date.now()).toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      discount: 20,
      productIds: [products[0].id, products[1].id],
      isActive: true,
    }
  ];

  return {
    restaurants,
    users,
    products,
    orders,
    tables,
    ingredients,
    suppliers,
    promotions,
  };
};