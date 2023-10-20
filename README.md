# PokeDesk

# Como usar

## Descargar proyecto

```
git clone git@github.com:asterion/poke_desk.git
```

## Instalar dependencias

Ingresar al directorio de proyecto y realizar instalación.

```
composer intall
npm install
```

## Crear base de datos

Ingresar a su servicio de base de datos MySQL y crear una base de datos.

```
create database pokemon;
```

### Configurar

Configurar .env con los datos de conexion de su base de datos creada.

### Definir modelo de datos y cargar los pokemones

```
php artisan migrate
php artisan app:poke 100
```

## Frontend

Compilar assets para la aplicacion.

```
npm run dev
```

## Command artisan

Como parametro se puede entregar la cantidad de pokemons a buscar.
por defecto si no se entrega parametro se buscaran 100 pokemones.

```
php artisan app:poke 10
```

## React

Para utilizar React y ver las caracteristicas de lo desarrollado en react.

```
npm install
npm run dev
```

