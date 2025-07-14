# Usar Node.js 18 como imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código de la aplicación
COPY . .

# Crear un usuario no-root para ejecutar la aplicación
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambiar la propiedad de los archivos al usuario nodejs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer el puerto que usa la aplicación
EXPOSE 8080

# Establecer variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
