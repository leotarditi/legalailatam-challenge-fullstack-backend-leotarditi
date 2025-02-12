# Prueba Técnica: Desarrollo de una Aplicación de Gestión de Tareas (Fullstack)

## Descripción del Proyecto

El objetivo es desarrollar una aplicación de **Gestión de Tareas** utilizando **React, TypeScript, Zustand** para el frontend y **NestJS con MongoDB** para el backend. La aplicación permitirá a los usuarios:

- Crear, editar, eliminar y marcar tareas como completadas.
- Agrupar tareas por etiquetas (**tags**).
- Implementar un filtro de búsqueda por título y etiquetas.
- Gestionar el estado global en el frontend con **Zustand**.
- Implementar un backend con **NestJS y MongoDB** para la persistencia de datos.

---

## 1. Frontend (React + TypeScript + Zustand)

### Tecnologías a Usar:
- React con TypeScript
- Zustand para la gestión del estado
- React Query para manejo de llamadas API
- TailwindCSS (opcional)
- React Router para navegación

### Estructura de Carpetas (Frontend)
```
frontend/
│── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│── public/
```

---

## 2. Backend (NestJS + MongoDB)

### Tecnologías a Usar:
- NestJS con TypeScript
- MongoDB con Mongoose
- JWT para autenticación (Opcional)
- Jest para pruebas unitarias

### Estructura de Carpetas (Backend)
```
backend/
│── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
```

---

## 3. Conexión Frontend-Backend
- El frontend consumirá los endpoints del backend mediante `fetch` o **React Query**.
- El backend manejará la lógica de negocio y persistencia en **MongoDB**.
- Se pueden agregar pruebas unitarias con **Jest** para validar funcionalidad.

---

## 4. Criterios de Evaluación

### Frontend
| Aspecto | Puntaje |
|---------|---------|
| Estructura del Código | 10 pts |
| Uso de TypeScript | 10 pts |
| Implementación de Zustand (Frontend) | 10 pts |
| Manejo de Efectos Secundarios | 10 pts |
| Optimización de Rendimiento | 5 pts |

### Backend
| Aspecto | Puntaje |
|---------|---------|
| Backend con NestJS y MongoDB | 20 pts |
| API RESTful con Buenas Prácticas | 15 pts |
| Autenticación JWT (Opcional) | 10 pts |
| Pruebas Unitarias en Backend con Jest | 10 pts |

---

## 5. Formato de Entrega
- Código fuente en **GitHub**, con backend y frontend en carpetas separadas.
- **README.md** con instrucciones para correr backend y frontend.
- **Opcional:** Docker para facilitar el despliegue.

---

## 6. Puntos Adicionales
- Habilitar actualización en tiempo real con **WebSockets** (+5 pts).
- Agregar almacenamiento offline con **IndexedDB** (+5 pts).
- Desplegar la aplicación en **Vercel, Heroku u otro servicio** (+5 pts).
- Soporte para múltiples usuarios con autenticación **JWT y roles** (+10 pts).
