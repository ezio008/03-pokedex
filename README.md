<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```
3. Rellenar las variables de entorno en el archivo ```.env```
4. Ejecturar los siguiente comandos:
```bash
# instalar packages
$ yarn install

# instalar cliente
$ npm i -g @nestjs/cli

# levantar la base de datos
$ docker-compose up -d

# ejecutar en modo desarrollo
$ yarn start:dev
```
5. Recargar la base de datos con la semilla:
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest

# Production Build
1. Crear el archivo ```.env.prod```
2. Rellenar las variables de entorno de prod
3. Crear la nueva imagen:
```bash
$ docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```