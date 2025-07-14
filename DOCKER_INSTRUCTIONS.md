# 🐳 Instrucciones Completas para Docker Hub

## Prerrequisitos
- Docker Desktop instalado
- Cuenta en Docker Hub (https://hub.docker.com)

## 🚀 Pasos para subir a Docker Hub

### 1. Crear cuenta en Docker Hub
Visita https://hub.docker.com y crea una cuenta gratuita si no tienes una.

### 2. Instalar Docker Desktop
- **Windows/Mac**: Descargar desde https://www.docker.com/products/docker-desktop
- **Linux**: Seguir las instrucciones en https://docs.docker.com/engine/install/

### 3. Hacer login en Docker desde terminal
```bash
docker login
```
Ingresa tu usuario y contraseña de Docker Hub.

### 4. Construir la imagen
```bash
# Navegar al directorio del proyecto
cd "c:\Users\Usuario\Desktop\PASTAS-MILISENDA"

# Construir la imagen (reemplaza [tu-usuario] con tu usuario de Docker Hub)
docker build -t [tu-usuario]/pastas-milisenda:latest .
```

### 5. Probar la imagen localmente
```bash
# Crear archivo .env si no existe
echo "PORT=8080
MONGO_URI=mongodb://localhost:27017/pastasMilisenda
JWT_SECRET=mi_clave_secreta
JWT_EXPIRATION=24h
ADMIN_EMAIL=admin@milisenda.com" > .env

# Ejecutar el contenedor
docker run -p 8080:8080 --env-file .env [tu-usuario]/pastas-milisenda:latest
```

### 6. Subir a Docker Hub
```bash
docker push [tu-usuario]/pastas-milisenda:latest
```

### 7. Verificar en Docker Hub
- Visita: https://hub.docker.com/r/[tu-usuario]/pastas-milisenda
- Confirma que la imagen se publicó correctamente

## 📋 Ejemplo Completo

Reemplaza `miusuario` con tu usuario real de Docker Hub:

```bash
# 1. Login
docker login

# 2. Construir
docker build -t miusuario/pastas-milisenda:latest .

# 3. Probar localmente
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/pastasMilisenda \
  -e JWT_SECRET=mi_clave_secreta \
  -e JWT_EXPIRATION=24h \
  -e ADMIN_EMAIL=admin@milisenda.com \
  miusuario/pastas-milisenda:latest

# 4. Subir a Docker Hub
docker push miusuario/pastas-milisenda:latest
```

## 🔗 Actualizar README.md

Una vez subida la imagen, actualiza el README.md con el enlace real:

```markdown
**Enlace a Docker Hub:** https://hub.docker.com/r/[tu-usuario]/pastas-milisenda
```

## 🌐 Usar la imagen desde Docker Hub

Cualquier persona puede descargar y usar tu imagen:

```bash
# Descargar
docker pull [tu-usuario]/pastas-milisenda:latest

# Ejecutar
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/pastasMilisenda \
  -e JWT_SECRET=clave_secreta \
  [tu-usuario]/pastas-milisenda:latest
```

## 📊 Verificación de funcionamiento

Después de ejecutar el contenedor, verifica:

- ✅ **API Principal**: http://localhost:8080
- ✅ **Documentación Swagger**: http://localhost:8080/api-docs
- ✅ **Endpoint de prueba**: http://localhost:8080/api/adoptions

## 🐛 Solución de problemas

### Error: "docker: command not found"
- Instalar Docker Desktop
- Reiniciar terminal después de la instalación

### Error de conexión a MongoDB
- Usar `host.docker.internal` en lugar de `localhost` para la MONGO_URI
- O usar docker-compose para levantar MongoDB también

### Error de autenticación en Docker Hub
- Verificar usuario y contraseña
- Asegurarse de que el repositorio existe en Docker Hub

## 🔄 Docker Compose (Alternativa)

Para una experiencia completa con MongoDB incluido:

```bash
# Levantar todo el stack
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📈 Siguiente paso

¡Tu proyecto está completamente dockerizado! 🎉

Para la entrega final, asegúrate de:
1. ✅ Subir imagen a Docker Hub
2. ✅ Actualizar README.md con el enlace
3. ✅ Probar que la imagen funciona correctamente
4. ✅ Verificar que los tests pasan: `npm test`
