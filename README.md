# ANGULAR ZOO

Proyecto Angular para un zoo ficticio desarrollado como portfolio junior. Se encuentra todavía en desarrollo. Por el momento, la aplicación permite la gestión de tickets, registro de usuarios, sistema de membresías y compra de entradas con descuentos dinámicos.

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

- ng test -- --include='**/ticket-card.component.spec.ts'

## Funcionalidades implementadas

### Sistema de compra de entradas

- **Componente para poder comprar entradas**

- **Servicio para el cálculo dinámico del precio**

- **Estrategias en el pago dinámicas**

  - ***MemberPriceStrategy: 50% descuento para socios***

  - ***NonMemberPriceStrategy: Precio completo para no socios***

- **Factoría para la creación de objetos Ticket con validación**

- **Repositorio para guardar los datos en el LocalStorage**

- **Servicio de compra de entradas**

### Sistema para los usuarios: registro y login

- **Componente para el formulario de registro**

- **Componente para el formulario de login**

- **Factoría para la creación de objetos User**

- **Repositorio para guardar datos en el IndexDB**

- **Servicio de autenticación**

- **Sincronización entre el estado del socio y el cálculo del precio de las entradas**

### Otras funcionalidades

- **Servicio para cambiar el tema de la aplicación**

## Patrones implementados

- **Factory Pattern: TicketFactory, UserFactory - Creación consistente de objetos**

- **Repository Pattern: TicketRepository, UserRepository - Abstracción de persistencia**

- **Strategy Pattern: MemberPriceStrategy, NonMemberPriceStrategy - Algoritmos intercambiables**

- **Facade Pattern: TicketService, AuthService - Interfaces simplificadas**

- **Observer Pattern: Signals para reactividad nativa**

- **Dependency Injection: Inyección de servicios en todos los componentes**

## Principios SOLID aplicados

- **Single Responsibility: Cada componente/servicio tiene una responsabilidad única**

- **Open/Closed: Extensible sin modificar código existente (nuevas estrategias de precio)**

- **Liskov Substitution: Estrategias intercambiables sin romper funcionalidad**

- **Interface Segregation: Interfaces específicas para cada contrato**

- **Dependency Inversion: Dependencias inyectadas, no instanciadas directamente**

## Testing incluído

- **Tests unitarios: Jasmine/Karma para todos los servicios y componentes**

- **Mocks: Dependencias externas (localStorage, IndexedDB) mockeadas**

- **Cobertura**

## Decisiones técnicas

### Con respecto a la arquitectura

- **Feature-based organization: tickets/, auth/ como módulos independientes**

- **Layered architecture: UI → Services → Factories/Repositories → Storage**

### Con respecto a la persistencia de datos

- **localStorage para tickets: Datos simples, pocos registros**

- **IndexedDB para usuarios: Datos estructurados, escalable**

- **Sesiones persistentes: localStorage guarda ID de usuario activo**

### Con respecto a la compra de entradas

Con respecto a dicha funcionalidad, decidí primero tener dicha característica funcionando de manera básica y esperar a crear la funcionalidad del login para añadir a los miembros en la ecuación.

El flujo transcurre desde que el usuario introduce el número de personas que desean una entrada hasta que se muestra una confirmación. Por el camino, una vez que se introducen las cantidades, un servicio se encarga de contear y calcular los precios. El usuario pulsa a comprar la entrada, en ese momento, mediante el Factory, se crea un objeto ticket con sus características. Finalmente, y esta vez usando Repository, dicha información se almacena en el localStorage del navegador.

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

## FUNCIONALIDADES PENSADAS

- *** cambio de idioma ***

- *** cambio de tema ***

- *** reserva de entradas (enum tipo de entrada: general, oferta, bono anual) ***

- *** hacerse socio ***

-*** muestra de cursos dependiendo de la temporada ***

-*** acceso a actividades dependiendo de la temporada ***

- *** apuntarse a una actividad ***

- *** apuntarse a un curso ***

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
  
## ESTRUCTURA DE CARPETAS

src/app/
├── app.ts                 (root standalone component)
├── app.routes.ts          (definición de rutas)
├── components/            (UI reutilizables + formularios)
├── pages/                 (componentes de página enlazadas a rutas)
├── sections/              (sub‑componentes del home)
├── services/              (lógica de negocio / estado)
├── interfaces/            (contratos TS)
├── models/                (tipos de datos)
├── factories/             (creadores de entidades)
├── repositories/          (persistencia: IndexedDB & localStorage)
└── strategy/              (pricing strategies)