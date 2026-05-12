# 🏢 API REST - Gestión de Espacios y Reservas CoWorking

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de espacios cowork y reservas de usuarios.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Bcrypt
- JSON Web Token (JWT)
- Cors
- Morgan
- Nodemon

---

## 📂 Estructura del proyecto

```bash
/data
│   ├── espacios.json
│   └── reservas.json
│
/src
│
├── app.js
├── server.js
│
├── /routes
│   ├── espacios.routes.js
│   ├── reservas.routes.js
│   └── usuarios.routes.js
│
├── /controllers
│   ├── espacios.controllers.js
│   ├── reservas.controller.js
│   └── usuarios.controllers.js
│
├── /models
│   ├── espacios.models.js
│   ├── reservas.models.js
│   ├── espacios.mongoose.js
│   ├── reservas.mongoose.js
│   └── usuarios.mongoose.js
│
├── /middlewares
│   ├── comprobarReserva.js
│   ├── validarConflicto.js
│   ├── validarReserva.js
│   ├── auth.js
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── validarHoras.js
│   └── verificarAdmin.js
│
└── /database
    └── mongoose.js
```

---

## ⚙️ Configuración

El proyecto utiliza variables de entorno mediante un archivo `.env`.

Si no se encuentra el archivo `.env`, el servidor se ejecutará por defecto en:

```env
PORT=3000
```

La conexión a MongoDB se realiza mediante:

```bash
mongodb://localhost:27017/cowork
```

---

## 📦 Instalación

Instalar dependencias:

```bash
npm install
```

---

## ▶️ Ejecución del proyecto

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
node src/server.js
```

---

# 📌 Endpoints

# 👤 Usuarios

## Registrar usuario

```http
POST /usuario/registro
```

### Body

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "numero": 912345678,
  "correo": "juan@email.com",
  "contraseña": "123456"
}
```

---

## Iniciar sesión

```http
POST /usuario/inicioSesion
```

### Body

```json
{
  "correo": "juan@email.com",
  "contraseña": "123456"
}
```

---

# 🏢 Espacios

⚠️ Todas las rutas de espacios requieren autenticación mediante JWT.

## Mostrar espacios

```http
GET /espacios/mostrarEspacios
```

### Respuesta

Cada espacio muestra:

- nombre
- ubicación
- descripción
- capacidad
- precio
- disponibilidad
- imagen
- características

---

## Crear espacio (solo administrador)

```http
POST /espacios/crearEspacios
```

### Middlewares

- `auth`
- `verificarAdmin`

### Body

```json
{
  "nombre": "Sala Ejecutiva",
  "ubicacion": "Santiago Centro",
  "descripcion": "Espacio privado para reuniones",
  "capacidad": {
    "min": 1,
    "max": 10
  },
  "precio": 25000,
  "imagen": "imagen.jpg",
  "caracteristicas": [
    "WiFi",
    "Aire acondicionado",
    "Proyector"
  ]
}
```

---

# 📅 Reservas

⚠️ Todas las rutas de reservas requieren autenticación mediante JWT.

---

## Mostrar todas las reservas (solo administrador)

```http
GET /reservas/mostrarReservas
```

### Middlewares

- `auth`
- `verificarAdmin`

---

## Crear reserva

```http
POST /reservas/crearReserva
```

### Middlewares

- `auth`
- `validarHoras`
- `validarReserva`
- `validarConflicto`

### Body

```json
{
  "idEspacio": "ID_DEL_ESPACIO",
  "fecha": "10/05/2026",
  "horaInicio": "09:00",
  "horaFin": "12:00",
  "idUsuario": "ID_DEL_USUARIO"
}
```

---

## Cambiar estado de reserva

```http
PUT /reservas/:idReserva
```

### Middlewares

- `comprobarReserva`

### Params

```bash
:idReserva
```

### Body

```json
{
  "estado": "cancelada"
}
```

Estados permitidos:

- `cancelada`
- `finalizada`

---

## Obtener reservas de un usuario

```http
GET /reservas/usuario/:idUsuario
```

### Params

```bash
:idUsuario
```

---

# 🧠 Arquitectura

## Controladores

Contienen la lógica de negocio de cada endpoint.

---

## Modelos

Gestionan la interacción con MongoDB mediante Mongoose y también archivos JSON.

---

## Middlewares

### `auth.js`

Verifica autenticación mediante JWT.

### `verificarAdmin.js`

Restringe rutas exclusivas para administradores.

### `validarReserva.js`

Valida los datos enviados para reservas.

### `validarHoras.js`

Verifica que las horas ingresadas sean válidas.

### `validarConflicto.js`

Evita reservas con horarios superpuestos.

### `comprobarReserva.js`

Comprueba que la reserva exista antes de modificarla.

### `errorHandler.js`

Middleware centralizado para manejo de errores.

### `notFound.js`

Maneja rutas inexistentes.

---

# 🛡️ Manejo de errores

La API incluye manejo de errores para:

- Datos inválidos
- Recursos no encontrados
- Errores de autenticación
- Tokens inválidos
- Permisos insuficientes
- Conflictos de horarios
- Errores internos del servidor

---

# 🔍 Validaciones

Se validan aspectos como:

- Campos obligatorios
- Formato de fecha
- Formato de horas
- Disponibilidad del espacio
- Conflictos entre reservas
- Roles de usuario
- JWT válido

---

# 🔐 Autenticación

La autenticación se realiza mediante **JSON Web Tokens (JWT)**.

Las rutas protegidas requieren enviar el token en los headers:

```http
Authorization: Bearer TOKEN
```

---

# 📊 Logs y CORS

- **Morgan:** registra solicitudes HTTP en consola.
- **Cors:** permite solicitudes desde otros dominios.

---

# 📌 Notas

- El proyecto utiliza MongoDB como base de datos principal.
- Algunas funcionalidades utilizan archivos JSON para pruebas locales.
- Arquitectura modular basada en Express.
- Proyecto orientado a práctica backend profesional con Node.js y MongoDB.