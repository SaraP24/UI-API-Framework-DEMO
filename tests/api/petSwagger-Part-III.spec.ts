import { test, request } from "@playwright/test";
import { PetstoreClient } from '../../api-client/pet-store-api-client';

// Fixtures
const cyberDog = {
  id: 123456,
  name: "CyberDog",
  photoUrls: ["https://example.com/dog.jpg"],
  status: "available"
};

const user = {
  id: 999,
  username: "sara_bot",
  firstName: "Sara",
  lastName: "Bot",
  email: "sara@example.com",
  password: "neon123",
  phone: "123456789",
  userStatus: 1
};

//  Roast function
function roast(message: string): never {
  throw new Error(`💀 ${message}`);
}

//  Setup client once
let api: PetstoreClient;
test.beforeAll(async () => {
  const context = await request.newContext();
  api = new PetstoreClient(context);
});

//  PET
test('Add pet', async () => {
  const res = await api.post('/pet', cyberDog);
  if (res.status() !== 200) roast("Ni tu madre encuentra ese petId. ¿Seguro que existe?");
});

test('Get pet by ID', async () => {
  const res = await api.get(`/pet/${cyberDog.id}`);
  if (res.status() !== 200) roast("Ese petId está más perdido que tu dignidad en ranked.");
});

test('Update pet', async () => {
  const updated = { ...cyberDog, status: "sold" };
  const res = await api.put('/pet', updated);
  if (res.status() !== 200) roast("Intentaste actualizar un pet que ni el backend reconoce.");
});

test('Find pets by status', async () => {
  const res = await api.get('/pet/findByStatus?status=available');
  if (res.status() !== 200) roast("Buscar por status falló. ¿Qué sigue? ¿Consultar al horóscopo?");
});

test('Add pet sin nombre', async () => {
  const pet = { id: 9999, photoUrls: [], status: "available" };
  const res = await api.post('/pet', pet);
  if (res.status() === 200) roast("¿Aceptaron un pet sin nombre? El backend está en modo YOLO.");
});

test('Add pet con ID duplicado', async () => {
  const pet = { id: cyberDog.id, name: "ClonDog", photoUrls: [], status: "available" };
  const res = await api.post('/pet', pet);
  if (res.status() === 200) roast("El sistema aceptó un clon. ¿Estamos en Westworld?");
});

test('Validar estructura de pet', async () => {
  const res = await api.get(`/pet/${cyberDog.id}`);
  const body = await res.json();
  const keys = ['id', 'name', 'photoUrls', 'status'];
  for (const key of keys) {
    if (!(key in body)) roast(`Falta '${key}' en la respuesta. ¿Quién diseñó este contrato?`);
  }
});

test('Buscar pets por status inválido', async () => {
  const res = await api.get('/pet/findByStatus?status=ghosted');
  if (res.status() !== 200) roast("Ese status no existe. ¿Querías buscar mascotas del más allá?");
});

const statuses = ['available', 'pending', 'sold', 'ghosted'];

for (const status of statuses) {
  test(`Buscar pets por status: ${status}`, async () => {
    const res = await api.get(`/pet/findByStatus?status=${status}`);
    if (res.status() !== 200 && status !== 'ghosted') {
      roast(`Falló búsqueda por status '${status}'. ¿El backend se olvidó cómo filtrar?`);
    }
  });
}


//  STORE
test('Get inventory', async () => {
  const res = await api.get('/store/inventory');
  if (res.status() !== 200) roast("Ni el almacén sabe qué tiene. ¿Un inventario fantasma?");
});

test('Place order', async () => {
  const order = {
    id: 888,
    petId: cyberDog.id,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: "placed",
    complete: false
  };
  const res = await api.post('/store/order', order);
  if (res.status() !== 200) roast("Tu orden fue tan ignorada como los términos y condiciones.");
});

test('Get order by ID', async () => {
  const res = await api.get('/store/order/888');
  if (res.status() !== 200) roast("Ese orderId está más desaparecido que Half-Life 3.");
});

test('Delete order', async () => {
  const res = await api.delete('/store/order/888');
  if (res.status() !== 200) roast("Ni el backend quiere borrar esa orden. Sos vos, no ellos.");
});

test('Get order inexistente', async () => {
  const res = await api.get('/store/order/999999');
  if (res.status() === 200) roast("¿Te devolvieron una orden que no existe? El backend está alucinando.");
});

test('Validar claves de inventario', async () => {
  const res = await api.get('/store/inventory');
  const body = await res.json();
  const expectedKeys = ['available', 'pending', 'sold'];
  for (const key of expectedKeys) {
    if (!(key in body)) roast(`Falta '${key}' en el inventario. ¿Quién se robó los estados?`);
  }
});


//  USER
test('Create user', async () => {
  const res = await api.post('/user', user);
  if (res.status() !== 200) roast("Crear usuario falló. ¿Probaste con 'admin' y '1234'?");
});

test('Get user by username', async () => {
  const res = await api.get(`/user/${user.username}`);
  if (res.status() !== 200) roast("Ese username está más vacío que tu bandeja de entrada.");
});

test('Update user', async () => {
  const updated = { ...user, firstName: "UpdatedSara" };
  const res = await api.put(`/user/${user.username}`, updated);
  if (res.status() !== 200) roast("Actualizar usuario falló. El servidor te ghosteó.");
});

test('Delete user', async () => {
  const res = await api.delete(`/user/${user.username}`);
  if (res.status() !== 200) roast("Ni el sistema quiere dejarte ir. Toxicidad nivel API.");
});

test('Login user', async () => {
  const res = await api.get(`/user/login?username=${user.username}&password=${user.password}`);
  if (res.status() !== 200) roast("Login falló. ¿Olvidaste tu contraseña o tu dignidad?");
});

test('Logout user', async () => {
  const res = await api.get('/user/logout');
  if (res.status() !== 200) roast("Logout falló. Te quedaste atrapado como bug en Skyrim.");
});

test('Crear usuario sin username', async () => {
  const invalidUser = { ...user, username: undefined };
  const res = await api.post('/user', invalidUser);
  if (res.status() === 200) roast("¿Aceptaron un usuario sin username? ¿Cómo lo vas a loguear, por telepatía?");
});

test('Login con credenciales incorrectas', async () => {
  const res = await api.get(`/user/login?username=wrong&password=fail`);
  if (res.status() === 200) roast("Login exitoso con credenciales falsas. ¿Tenés acceso root sin querer?");
});