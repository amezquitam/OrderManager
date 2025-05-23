

class ApiService {
    constructor(basePath) {
        this.client = axios.create({
            baseURL: `http://localhost:8080/api/v1/${basePath}`,
            withCredentials: true
        });
    }

    // GET /resource
    getAll() {
        return this.client.get('/');
    }

    // GET /resource/{id}
    getById(id) {
        return this.client.get(`/${id}`);
    }

    // POST /resource
    create(payload) {
        return this.client.post('/', payload);
    }

    // POST /resource/{id}
    update(id, payload) {
        return this.client.post(`/${id}`, payload);
    }

    // DELETE /resource/{id}
    delete(id) {
        return this.client.delete(`/${id}`);
    }
}

// lista de entidades para las que queremos un servicio
// entitiesExamples.js

const entities = {
    ingredient: {
        name: "Tomate",
        description: "Tomate rojo fresco",
        unit: "kg",
        category: "Vegetable",
        currentStock: 100,
        minStock: 10
    },
    order: {
        client: { id: 1 },
        status: "PENDING",
        timestamp: "2025-05-22T10:00:00Z"
    },
    "order-detail": {
        product: { id: 1 },
        order: { id: 1 },
        quantity: 2
    },
    payment: {
        order: { id: 1 },
        timestamp: "2025-05-22T11:00:00Z",
        amount: "150.00",
        paymentMethod: "CREDIT_CARD",
        invoiceUrl: "https://invoices.example.com/12345.pdf"
    },
    product: {
        restaurant: { id: 1 },
        name: "Café",
        description: "Un buen café tostado",
        price: 2500.00,
        image: "cafe.jpg",
        active: true
    },
    "product-ingredient": {
        product: { id: 1 },
        ingredient: { id: 1 },
        quantity: 5
    },
    promotion: {
        product: { id: 1 },
        description: "10% de descuento en café",
        startDate: "2025-05-01",
        endDate: "2025-05-31",
        visible: true
    },
    purchase: {
        supplier: { id: 1 },
        date: "2025-04-15"
    },
    "purchase-ingredient": {
        ingredient: { id: 1 },
        quantity: 50,
        purchase: { id: 1 }
    },
    rating: {
        user: { id: 1 },
        product: { id: 1 },
        rating: 5,
        comment: "Excelente calidad"
    },
    restaurant: {
        name: "Sakura Sushi",
        image: "sakura.jpg",
        gmapsLocation: "https://maps.google.com/?q=Sakura+Sushi",
        address: "Calle 45 #12-34",
        instagram: "@sakurasushi",
        facebook: "facebook.com/sakurasushi",
        whatsapp: "+573001234567",
        active: true
    },
    role: {
        role: "ADMIN"
    },
    schedule: {
        restaurant: { id: 1 },
        weekday: "MONDAY",
        openingHour: 8,
        closingHour: 18
    },
    supplier: {
        name: "Proveedor Uno",
        restaurant: { id: 1 }
    },
    "table-entity": {
        restaurant: { id: 1 },
        name: "Mesa 1"
    },
    user: {
        role: { id: 1 },
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@example.com",
        password: "SecurePass123",
        verified: true,
        active: true
    },
    "user-restaurant-roles": {
        user: { id: 1 },
        restaurant: { id: 1 },
        role: "MANAGER"
    }
};


// crear un objeto con un servicio por entidad
const services = Object.keys(entities).reduce((acc, name) => {
    // camelCase para la clave
    const key = name.replace(/\/?([a-z])/g, (_, c, i) => i ? c.toUpperCase() : c);
    acc[`${key}Service`] = new ApiService(name);
    return acc;
}, {});

// exportar todos los servicios
export { services, entities };
