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

````markdown
# Abstracta Academy UI Exercise - Quick Start

Pequeñas mejoras y comandos rápidos añadidos al proyecto original.

Instalar dependencias:

```powershell
npm install
```

Ejecutar todas las pruebas (por defecto headless):

```powershell
npm test
```

Ejecutar pruebas con navegador visible:

```powershell
$env:PW_HEADLESS = 'false'; npm run test:headed
```

Ejecutar pruebas en modo debug UI:

```powershell
npm run test:debug
```

Mejoras aplicadas en esta rama:

- `playwright.config.ts` ahora incluye proyectos para `chromium`, `firefox` y `webkit`.
- Se agregó control de `headless` a través de la variable de entorno `PW_HEADLESS`.
- `package.json` incluye scripts útiles (`test`, `test:headed`, `test:debug`).
- Se implementó `HomePage.getProductsFromPages(pages: number)` para recolectar productos de N páginas sin duplicar test logic.
- Documentación con recomendaciones sobre cómo mejorar la robustez de los tests.

---

## Lint y formato

Instalar las dependencias nuevas (localmente) y luego ejecutar:

```powershell
npm install
npm run lint
npm run format
```

Nota: `lint` usará ESLint y `format` usará Prettier. Añadí configuración base en `.eslintrc.json` y `.prettierrc`.
Nota adicional: para la validación de esquemas JSON se añadió `ajv` y `ajv-formats` en `package.json`. Ejecutá `npm install` localmente para instalarlos antes de ejecutar los tests o las validaciones.


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



````



