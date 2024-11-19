# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia las dependencias del proyecto
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto que Next.js utiliza
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["yarn", "dev"]
