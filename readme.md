  # 🏨 Coworking API 

API REST para gestionar reservas de espacios, usuarios y disponibilidad
en un sistema de coworking.
Permite registro de usuarios, autenticación con JWT, gestión de espacios
y reservas, y control de disponibilidad.

## 🚀 Tecnologías Utilizadas

-   **Node.js**
-   **Express**
-   **Javascript**
-   **Sequelize** (MySQL)
-   JWT (Autenticación)
-   Bcrypt (Encriptación de contraseñas)
-   Mocha (pruebas unitarias)

## ⚙️ Instalación

Npm install (para instalar todas las dependencias)

## crear archivo .env oara variables de entorno
PORT 
DB_NAME
DB_PASSWORD
DB_USER=root
HOST=localhost
JWT_SECRET

## Para levantar proyecto

Npm start (produccion)

Npm run dev (desarrollo)

Npm test (para pruebas unitarias)


## Endpoints Principales

### Auth

  Método   Ruta                   Descripción
  -------- ---------------------- ---------------------
  POST     `/api/auth/register`   Registro de usuario
  POST     `/api/auth/login`      Inicio de sesión
  POST     `/api/auth/logout`     Cerrar esion

### Spaces

  Método   Ruta            Descripción
  -------- --------------- -------------------------
  GET      `/api/spaces`      Listar espacios por filtros
  GET `/api/spaces/availability` Ver espacios disponibles
   GET    `/api/spaces/:id`       Buscar espacio por id

### 🗓️ Reservas

  Método   Ruta                  Descripción
  -------- --------------------- ------------------
  GET      `/api/bookings`       mis reservas (del usuario logueado)
  POST     `/api/bookings`       Crear reserva
  GET     `/api/bookings/:id`  detalle de una reserva
  Patch   `/api/bookings/:id`   Cancelar reserva


  ### 🗓️ Admin

  Método   Ruta                  Descripción
  -------- --------------------- ------------------
  GET      `GET /api/admin/bookings` todas las reservas con paginación
  Put   `/api/admin/spaces/:id`   actualizar info de un espacio
  ## 🎯 Próximas mejoras

-   Notificaciones por correo
-   Integración con pagos
-   Endpoint para ver metrica(total de reservas del mes, ingresos, espacios más usados)
-   Endpoint para extender una reserva
-   Refresh token

## colleccion de postman
https://robert-5436938.postman.co/documentation/44551323-4289591d-c16d-4f40-867d-e4ea06886a67/publish?workspaceId=3d95c822-5558-4365-8ba4-3595cc1f6bf9&authFlowId=1f0f8b0a-847c-4c57-b570-4ac3c45eccf5


## decisiones importantes tomadas

en este caso decidi usar Javascript vanilla porque todavia no me siento muy comodo usando typescript,
tambien en el endpoint de cancelar reserva en vez de utilizar un PUT como lo pusiste en el mandanto decidi usar un PATCH
porque como solo era cambiar el estado de la respuesta de 'pending' a 'cancelle ' decidir usar PATCH


# Nota
hice lo mejor que pude con el conocimiento que tenia,gracias a este ejercicio pude ampliar mas mis conocimientos,
reforzar algunas cosas y saber donde tengo que mejor , asi que quiero agradecerte por la oportunidad aunque no pase la prueba.

ahh y perdon por mi mala ortografia en algunos de los casos
