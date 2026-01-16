# ANGULAR ZOO

## COMANDOS

### Compilar y abrir el proyecto

- ng s -o/ ng serve -o

### Instalar Angular Material

- ng add @angular/material

### Instalar ngx-translate

- ng add @ngx-translate/core
- ng add @ngx-translate/http-loader

### Ejecutar pruebas unitarias

- ng test

## SECCIONES

### En el header

- páginas:

  - home
  - comprar tickets/entradas
  - animales
  - ecosistemas
  - hacerse socio/miembro
  
- comprar tickets/entradas
- contacto
- elegir idioma
- elegir tema

### En home

- bienvenida
- compra de tickets/entradas
- info del parque:

  - nuestros horarios,
  - mapa del zoo,
  - animales,
  - ecosistemas
- cursos educativos
- actividades:

  - exhibición de aves
  - actividad con fauna africana
  - actividad con monos

## FUNCIONALIDADES

- cambio de idioma
- cambio de tema
- reserva de entradas (enum tipo de entrada: general, oferta, bono anual):
  - comprar entrada:
    - añadir a DBIndex
  - cancelar entrada
    - borrar datos del formulario
- hacerse socio:
  - darse de alta:
    - añadir a DBIndex
    - editar en DBIndex
    - eliminar de DBIndex
    - eliminar todos los registros de DBIndex
- apuntarse a una actividad:
  - darse de alta en la actividad en el DBIndex
  - darse de baja de la actividad en el DBIndex
- apuntarse a un curso

## INTERFACES

- language
- theme
- ticket
- activity
- course

## COMPONENTES

### Principales

- header
- footer

### Secundarios (secciones)

- hero:
  - sección de bienvenida con imagen de fondo
- ticket-purchase
  - sección de compra de entradas
- about-info (cada una envía a la composición de una página diferente):
  - horarios
  - localización
  - animales
  - ecosistemas
- membership
- courses
- activities

### Concretos

- form:
  - darse de alta como socio/miembro
  - comprar una entrada/ticket
  - apuntarse a una actividad
  - apuntarse a un curso

## SERVICIOS

- language-service: para la elección de idioma
- theme-service: para la elección del tema
- ticket-service: para la compra de entradas
- membership-service: para darse de alta como socio
- activity-service: para darse de alta en una actividad
- course-service: para darse de alta en un curso
