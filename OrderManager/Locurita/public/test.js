// usage.js
import { services, entities } from '/data.js';

async function testAll() {
  for (const [name, svc] of Object.entries(services)) {
    try {
      console.log(`\n=== Testing ${name} ===`);
      // obtener todos
      await svc.getAll();
      // obtener uno
      await svc.getById(entities[name]);
      // crear (payload según esquema de entidad)
      await svc.create(entities[name]);
      // actualizar
      await svc.update(1, entities[name]);
      // eliminar
      await svc.delete(1);
    } catch (err) {
      console.error(`Error testing ${name}:`, err.response?.status, err.message);
    }
  }
}

console.log("testing")
testAll();
