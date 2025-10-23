import { test, request, expect } from "@playwright/test";
import { PetstoreClient } from "../api-client/pet-store-api-client";

let api: PetstoreClient;
test.beforeAll(async () => {
  const context = await request.newContext();
  api = new PetstoreClient(context);
});

test('POST /pet/{petId}/uploadImage', async () => {
  const res = await api.post(`/pet/${petId}/uploadImage`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /pet', async () => {
  const payload = {};
  const res = await api.post(`/pet`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('PUT /pet', async () => {
  const payload = {};
  const res = await api.put(`/pet`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /pet/findByStatus', async () => {
  const res = await api.get(`/pet/findByStatus`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /pet/findByTags', async () => {
  const res = await api.get(`/pet/findByTags`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /pet/{petId}', async () => {
  const res = await api.get(`/pet/${petId}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /pet/{petId}', async () => {
  const res = await api.post(`/pet/${petId}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('DELETE /pet/{petId}', async () => {
  const res = await api.delete(`/pet/${petId}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /store/inventory', async () => {
  const res = await api.get(`/store/inventory`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /store/order', async () => {
  const payload = {};
  const res = await api.post(`/store/order`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /store/order/{orderId}', async () => {
  const res = await api.get(`/store/order/${orderId}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('DELETE /store/order/{orderId}', async () => {
  const res = await api.delete(`/store/order/${orderId}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /user/createWithArray', async () => {
  const payload = {};
  const res = await api.post(`/user/createWithArray`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /user/createWithList', async () => {
  const payload = {};
  const res = await api.post(`/user/createWithList`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /user/{username}', async () => {
  const res = await api.get(`/user/${username}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('PUT /user/{username}', async () => {
  const payload = {};
  const res = await api.put(`/user/${username}`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('DELETE /user/{username}', async () => {
  const res = await api.delete(`/user/${username}`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /user/login', async () => {
  const res = await api.get(`/user/login`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('GET /user/logout', async () => {
  const res = await api.get(`/user/logout`);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});

test('POST /user', async () => {
  const payload = {};
  const res = await api.post(`/user`, payload);
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});
