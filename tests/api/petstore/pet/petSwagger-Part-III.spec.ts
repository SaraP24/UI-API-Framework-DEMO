// import { test, request } from "@playwright/test";
// import { PetstoreClient } from '../../../../api-client/pet-store-api-client';

// // Fixtures
// const cyberDog = {
//   id: 123456,
//   name: "CyberDog",
//   photoUrls: ["https://example.com/dog.jpg"],
//   status: "available"
// };

// const user = {
//   id: 999,
//   username: "sara_bot",
//   firstName: "Sara",
//   lastName: "Bot",
//   email: "sara@example.com",
//   password: "neon123",
//   phone: "123456789",
//   userStatus: 1
// };

// //  Setup client once
// let api: PetstoreClient;
// test.beforeAll(async () => {
//   const context = await request.newContext();
//   api = new PetstoreClient(context);
// });

// //  PET
// test('Add pet', async () => {
//   const res = await api.post('/pet', cyberDog);
//   if (res.status() !== 200) throw new Error("petId not found");
// });

// test('Get pet by ID', async () => {
//   const res = await api.get(`/pet/${cyberDog.id}`);
//   if (res.status() !== 200) throw new Error("petId not found");
// });

// test('Update pet', async () => {
//   const updated = { ...cyberDog, status: "sold" };
//   const res = await api.put('/pet', updated);
//   if (res.status() !== 200) throw new Error("Try to update pet failed");
// });

// test('Find pets by status', async () => {
//   const res = await api.get('/pet/findByStatus?status=available');
//   if (res.status() !== 200) throw new Error("Search by status failed");
// });

// test('Add pet with missing name', async () => {
//   const pet = { id: 9999, photoUrls: [], status: "available" };
//   const res = await api.post('/pet', pet);
//   if (res.status() === 200) throw new Error("Pet without name was created");
// });

// test('Add pet con ID duplicado', async () => {
//   const pet = { id: cyberDog.id, name: "ClonDog", photoUrls: [], status: "available" };
//   const res = await api.post('/pet', pet);
//   if (res.status() === 200) throw new Error("El sistema aceptó un clon. ¿Estamos en Westworld?");
// });

// test('Validate pet structure', async () => {
//   const res = await api.get(`/pet/${cyberDog.id}`);
//   const body = await res.json();
//   const keys = ['id', 'name', 'photoUrls', 'status'];
//   for (const key of keys) {
//     if (!(key in body)) throw new Error(`Missing '${key}' in reponse`);
//   }
// });

// test('Search pets by invalid status', async () => {
//   const res = await api.get('/pet/findByStatus?status=ghosted');
//   if (res.status() !== 200) throw new Error("Status non existent");
// });

// const statuses = ['available', 'pending', 'sold', 'ghosted'];

// for (const status of statuses) {
//   test(`Search pets by status: ${status}`, async () => {
//     const res = await api.get(`/pet/findByStatus?status=${status}`);
//     if (res.status() !== 200 && status !== 'ghosted') {
//       throw new Error(`Search by status '${status}' failed`);
//     }
//   });
// }


// //  STORE
// test('Get inventory', async () => {
//   const res = await api.get('/store/inventory');
//   if (res.status() !== 200) throw new Error("Get inventory failed");
// });

// test('Place order', async () => {
//   const order = {
//     id: 888,
//     petId: cyberDog.id,
//     quantity: 1,
//     shipDate: new Date().toISOString(),
//     status: "placed",
//     complete: false
//   };
//   const res = await api.post('/store/order', order);
//   if (res.status() !== 200) throw new Error("Failed to place an order");
// });

// test('Get order by ID', async () => {
//   const res = await api.get('/store/order/888');
//   if (res.status() !== 200) throw new Error("orderId is missing or the order was never placed.");
// });

// test('Delete order', async () => {
//   const res = await api.delete('/store/order/888');
//   if (res.status() !== 200) throw new Error("Failed to delete the order");
// });

// test('Get order inexistente', async () => {
//   const res = await api.get('/store/order/999999');
//   if (res.status() === 200) throw new Error("Got an order that should not exist");
// });

// test('Validar claves de inventario', async () => {
//   const res = await api.get('/store/inventory');
//   const body = await res.json();
//   const expectedKeys = ['available', 'pending', 'sold'];
//   for (const key of expectedKeys) {
//     if (!(key in body)) throw new Error(`Missing '${key}' on inventory`);
//   }
// });


// //  USER
// test('Create user', async () => {
//   const res = await api.post('/user', user);
//   if (res.status() !== 200) throw new Error("User creation failed");
// });

// test('Get user by username', async () => {
//   const res = await api.get(`/user/${user.username}`);
//   if (res.status() !== 200) throw new Error("Missing userId or user was not created");
// });

// test('Update user', async () => {
//   const updated = { ...user, firstName: "UpdatedSara" };
//   const res = await api.put(`/user/${user.username}`, updated);
//   if (res.status() !== 200) throw new Error("Update user failed");
// });

// test('Delete user', async () => {
//   const res = await api.delete(`/user/${user.username}`);
//   if (res.status() !== 200) throw new Error("Failed to delete user");
// });

// test('Login user', async () => {
//   const res = await api.get(`/user/login?username=${user.username}&password=${user.password}`);
//   if (res.status() !== 200) throw new Error("Login failed or user does not exist");
// });

// test('Logout user', async () => {
//   const res = await api.get('/user/logout');
//   if (res.status() !== 200) throw new Error("Logout failed, session may not have been active");
// });

// test('Createusuario without username', async () => {
//   const invalidUser = { ...user, username: undefined };
//   const res = await api.post('/user', invalidUser);
//   if (res.status() === 200) throw new Error("User without username was created");
// });

// test('Login with invalid credentials', async () => {
//   const res = await api.get(`/user/login?username=wrong&password=fail`);
//   if (res.status() === 200) throw new Error("Successful login with invalid credentials");
// });