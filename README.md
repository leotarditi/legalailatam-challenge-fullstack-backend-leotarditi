# Legal AI Latam Challenge – Backend

Este repositorio contiene la solución del desafío fullstack backend para Legal AI Latam, desarrollada con el framework [NestJS](https://nestjs.com) y utilizando MongoDB como base de datos a través de Mongoose. La aplicación implementa autenticación con JWT, manejo de usuarios y gestión de tareas.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración y Variables de Entorno](#configuración-y-variables-de-entorno)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Endpoints de la API](#endpoints-de-la-api)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Características

- **Autenticación y Autorización**:

  - Uso de JWT para la autenticación de usuarios.
  - Implementación de guardas de autenticación y roles, protegiendo rutas sensibles (por ejemplo, solo administradores pueden acceder a la gestión de usuarios).

- **Gestión de Usuarios**:

  - Registro y listado de usuarios.
  - Los usuarios se almacenan en MongoDB con atributos como nombre, email, contraseña (encriptada) y rol (USER o ADMIN).

- **Gestión de Tareas**:

  - Creación, edición y seguimiento de tareas.
  - Cada tarea tiene un título único, descripción, estado (realizada o no) y una referencia (userEmail) al usuario creador.

- **Validación Global**:

  - Uso del `ValidationPipe` de NestJS para filtrar y validar datos de entrada, aplicando whitelist y prohibiendo propiedades no deseadas.

- **CORS y Prefijo Global**:
  - Habilitación de CORS y definición de un prefijo global (`/api`) para todas las rutas.

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com): Framework de Node.js para construir aplicaciones escalables y eficientes.
- [TypeScript](https://www.typescriptlang.org): Superset de JavaScript que añade tipado estático.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): Base de datos NoSQL en la nube.
- [Mongoose](https://mongoosejs.com): ODM para MongoDB.
- [JWT](https://jwt.io): Para la autenticación basada en tokens.
- [pnpm](https://pnpm.io): Gestor de paquetes (similar a npm/yarn).

## Estructura del Proyecto

La organización del proyecto sigue la arquitectura modular propia de NestJS:

```
legalailatam-challenge-fullstack-backend-leotarditi/
├── src/
│   ├── auth/
│   │   ├── constants/
│   │   │   └── jwt.constant.ts  // Constante con la clave secreta para JWT.
│   │   ├── decorators/
│   │   │   ├── auth.decorator.ts // Combina guardas de autenticación y roles.
│   │   │   └── roles.decorator.ts
│   │   ├── guard/
│   │   │   ├── auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── auth.controller.ts   // Endpoints para login/autenticación.
│   │   └── auth.service.ts      // Lógica de autenticación.
│   │
│   ├── users/
│   │   ├── dto/
│   │   │   └── create-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts   // Esquema de usuario con nombre, email, contraseña y rol.
│   │   ├── users.controller.ts  // Rutas protegidas (accesibles solo para ADMIN).
│   │   └── users.service.ts     // Lógica para crear y listar usuarios.
│   │
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── create-task.dto.ts
│   │   ├── entities/
│   │   │   └── task.entity.ts   // Esquema de tarea: título, descripción, estado y referencia al usuario.
│   │   ├── tasks.controller.ts  // Endpoints para la gestión de tareas.
│   │   └── tasks.service.ts     // Lógica CRUD de tareas.
│   │
│   ├── app.module.ts            // Módulo raíz: conecta MongoDB y registra los módulos.
│   └── main.ts                  // Configuración global: CORS, prefijo de rutas, validación.
│
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/leotarditi/legalailatam-challenge-fullstack-backend-leotarditi.git
   cd legalailatam-challenge-fullstack-backend-leotarditi
   ```

2. **Instalar dependencias** (se recomienda usar [pnpm](https://pnpm.io)):

   ```bash
   pnpm install
   ```

## Configuración y Variables de Entorno

Actualmente, la cadena de conexión a MongoDB se encuentra codificada en el archivo `src/app.module.ts`. Para producción se recomienda:

- Mover la cadena de conexión y otras configuraciones sensibles a variables de entorno (por ejemplo, utilizando [dotenv](https://www.npmjs.com/package/dotenv)).
- Cambiar la clave secreta en `src/auth/constants/jwt.constant.ts` por una variable de entorno y evitar usar valores por defecto (la clave actual es _"no-utilizar-esta-palabra-en-producción"_).

Ejemplo de archivo `.env`:

```env
PORT=4000
MONGO_URI=mongodb+srv://admin:TU_CONTRASEÑA@clustertasksapp.spzuc.mongodb.net/tu-base?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
```

## Ejecución de la Aplicación

### Desarrollo

Para iniciar la aplicación en modo desarrollo (con recarga en caliente):

```bash
pnpm run start:dev
```

La aplicación se ejecutará en `http://localhost:4000/api` (o el puerto definido en `PORT`).

### Modo Producción

1. Compilar el proyecto:

   ```bash
   pnpm run build
   ```

2. Iniciar la aplicación en producción:

   ```bash
   pnpm run start:prod
   ```

## Endpoints de la API

La API expone distintos endpoints agrupados en módulos. A continuación se muestra un resumen:

### Autenticación (`/auth`)

- **POST /auth/login**:  
  Endpoint para iniciar sesión y obtener un token JWT.  
  _(Revisar la implementación en `src/auth/auth.controller.ts` y `src/auth/auth.service.ts` para detalles completos.)_

### Usuarios (`/users`)

_Protegido con el decorador `@Auth(Role.ADMIN)`; solo accesible para usuarios con rol ADMIN._

- **POST /users**:  
  Crear un nuevo usuario.  
  _Payload esperado (JSON):_
  ```json
  {
    "name": "Nombre del Usuario",
    "email": "correo@ejemplo.com",
    "password": "contraseña"
  }
  ```
- **GET /users**:  
  Listar todos los usuarios.

### Tareas (`/tasks`)

- **POST /tasks**:  
  Crear una nueva tarea.  
  _Payload esperado (JSON):_
  ```json
  {
    "title": "Título único de la tarea",
    "description": "Descripción de la tarea"
  }
  ```
- **GET /tasks**:  
  Listar todas las tareas.
- **PUT /tasks/:id** y **DELETE /tasks/:id**:  
  Endpoints para actualizar o eliminar una tarea (la implementación en `tasks.controller.ts` y `tasks.service.ts` define la lógica correspondiente).

> **Nota:** Se recomienda revisar los DTOs y validaciones implementadas en cada módulo para conocer los detalles de los datos requeridos.

## Contribuir

Las contribuciones son bienvenidas. Para colaborar:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad o corrección de errores.
3. Realiza tus cambios y haz commit.
4. Abre un Pull Request describiendo los cambios realizados.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

## Contacto

- **Autor**: [leotarditi](https://github.com/leotarditi)
- **Sitio Web**: [NestJS](https://nestjs.com)
