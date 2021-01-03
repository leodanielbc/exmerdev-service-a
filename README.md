## Description
Este microservicio almacena el email y pass en la base de datos, luego se comunica con el SERVICIO B mediante el uso de colas. Los datos que se envian son el name, lastname y phone, del cual espera una respuesta de que los datos se almacenaron correctamente.

## Tecnologies

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- RabbitMQ
- MongoDB
- Docker

## Installation

```bash
$ npm install
```

## Running the app

```bash

# conf docker rabbit
$ docker-compose up -d rabbit

# check container
$ docker-compose ps

# Unico Entorno de desarrollo
Se debe agregar el archivo(entorno) dev.env en la carpeta configs_env

# Unico Entorno de desarrollo
$ npm run start:dev



```
