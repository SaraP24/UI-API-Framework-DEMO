#  Petstore API Test Automation section

Este proyecto contiene un **framework de pruebas automatizadas** para la API de Swagger Petstore, desarrollado con **Playwright + TypeScript**.  
Incluye un generador de pruebas que lee el archivo Swagger/OpenAPI y crea casos de prueba listos para ejecutar.

---

## Requisitos previos
Instalar dependencias del proyecto:

```bash
npm install
```

## Generar pruebas desde Swagger
Genera automáticamente un archivo generated-petstore.spec.ts en la carpeta tests/ con casos para todos los endpoints definidos en el Swagger de Petstore.
```bash
npm run generate:petstore
```


### Especificaciones:
- Lee el Swagger desde https://petstore.swagger.io/v2/swagger.json
- Crea pruebas para todos los métodos (GET, POST, PUT, DELETE)
- Si el endpoint requiere body, genera un payload válido usando ejemplos o esquemas del Swagger
- Usa expect() para validar que el código de estado sea 200

## 2. Ejecutar las pruebas generadas
Corre únicamente el archivo generado por el script anterior.

```bash
npm run test:petstore
```

### Especificaciones:
```bash
npx playwright test tests/generated-petstore.spec.ts
```
- Muestra resultados en consola y genera reporte HTML si está configurado en playwright.config.ts

## 3. Ejecutar todas las pruebas
Corre todos los archivos .spec.ts en la carpeta tests/.
```bash
npm run test
```



