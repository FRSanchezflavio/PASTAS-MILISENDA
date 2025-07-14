# Pastas Milisenda

Aplicación de e-commerce para venta de pastas desarrollada con Node.js y MongoDB.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crear archivo `.env` con:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/pastasMilisenda
JWT_SECRET=mi_clave_secreta
JWT_EXPIRATION=24h
ADMIN_EMAIL=admin@milisenda.com
```

## 🏃‍♂️ Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Tests
```bash
npm test
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t pastas-milisenda .
```

### Ejecutar contenedor
```bash
docker run -p 8080:8080 --env-file .env pastas-milisenda
```

### Docker Hub
La imagen de Docker está disponible en Docker Hub:
```bash
docker pull [tu-usuario]/pastas-milisenda:latest
```

**Enlace a Docker Hub:** `https://hub.docker.com/r/[tu-usuario]/pastas-milisenda`

## 📚 Documentación API

La documentación de la API está disponible en Swagger:
- **Local:** http://localhost:8080/api-docs
- **Producción:** https://pastasmilisenda.herokuapp.com/api-docs

## 🏗️ Estructura del Proyecto

```
├── controllers/        # Lógica de controladores
├── dao/               # Acceso a datos
├── dto/               # Objetos de transferencia de datos
├── middlewares/       # Middlewares de autenticación
├── models/            # Modelos de MongoDB
├── repositories/      # Capa de repositorio
├── routes/            # Definición de rutas
├── services/          # Lógica de negocio
├── views/             # Vistas Handlebars
├── test/              # Pruebas unitarias y funcionales
├── docs/              # Documentación Swagger
├── config/            # Configuraciones
├── Dockerfile         # Configuración Docker
├── .dockerignore      # Archivos ignorados por Docker
└── README.md          # Este archivo
```

## 🔌 API Endpoints

### Autenticación (Users)
- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión
- `GET /api/sessions/current` - Obtener usuario actual
- `POST /api/sessions/logout` - Cerrar sesión

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

### Carrito
- `GET /api/carts/:cid` - Obtener carrito
- `POST /api/carts/:cid/product/:pid` - Agregar producto al carrito
- `DELETE /api/carts/:cid/product/:pid` - Eliminar producto del carrito
- `POST /api/carts/:cid/purchase` - Finalizar compra

### Adopciones
- `GET /api/adoptions` - Listar adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions` - Crear adopción
- `PUT /api/adoptions/:aid` - Actualizar adopción
- `DELETE /api/adoptions/:aid` - Eliminar adopción
- `GET /api/adoptions/user/:uid` - Adopciones por usuario

## 🧪 Testing

El proyecto incluye tests funcionales completos para todos los endpoints:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

### Tests incluidos:
- ✅ Tests funcionales para adoption router
- ✅ Validación de autenticación
- ✅ Validación de datos de entrada
- ✅ Manejo de errores

## 🛠️ Tecnologías

- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB, Mongoose
- **Autenticación:** JWT, Bcrypt, Passport
- **Documentación:** Swagger/OpenAPI
- **Testing:** Mocha, Chai
- **Containerización:** Docker
- **Template Engine:** Handlebars
- **Variables de entorno:** Dotenv

## 🚀 Despliegue

### Variables de entorno para producción
```env
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/pastasmilisenda
JWT_SECRET=clave_secreta_super_segura
JWT_EXPIRATION=24h
ADMIN_EMAIL=admin@milisenda.com
```

### Docker Compose (opcional)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/pastasmilisenda
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
