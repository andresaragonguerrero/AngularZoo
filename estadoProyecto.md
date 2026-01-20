# ANGULAR ZOO - PROYECTO FICTICIO PARA PORTFOLIO JUNIOR

## COMANDOS

### Compilar y abrir el proyecto
```bash
ng s -o
# o
ng serve -o
```

### Instalar Angular Material
```bash
ng add @angular/material
```

### Instalar ngx-translate
```bash
ng add @ngx-translate/core
ng add @ngx-translate/http-loader
```

### Ejecutar pruebas unitarias
```bash
ng test
```

## SECCIONES

### En el header
- **Páginas:**
  - Home
  - Comprar tickets/entradas
  - Animales
  - Ecosistemas
  - Hacerse socio/miembro
- Comprar tickets/entradas
- Contacto
- Elegir idioma
- Elegir tema

### En home
- Bienvenida
- Compra de tickets/entradas
- **Info del parque:**
  - Nuestros horarios
  - Mapa del zoo
  - Animales
  - Ecosistemas
- Cursos educativos
- **Actividades:**
  - Exhibición de aves
  - Actividad con fauna africana
  - Actividad con monos

## FUNCIONALIDADES

- Cambio de idioma
- Cambio de tema
- **Reserva de entradas** (enum tipo de entrada: general, oferta, bono anual):
  - Comprar entrada: añadir a DBIndex
  - Cancelar entrada: borrar datos del formulario
- **Hacerse socio:**
  - Darse de alta: añadir a DBIndex
  - Editar en DBIndex
  - Eliminar de DBIndex
  - Eliminar todos los registros de DBIndex
- **Apuntarse a una actividad:**
  - Darse de alta en la actividad en el DBIndex
  - Darse de baja de la actividad en el DBIndex
- Apuntarse a un curso

## INTERFACES

- Language
- Theme
- Ticket
- Activity
- Course

## COMPONENTES

### Principales
- Header
- Footer

### Secundarios (secciones)
- **Hero:** sección de bienvenida con imagen de fondo
- **Ticket-purchase:** sección de compra de entradas
- **About-info** (cada una envía a la composición de una página diferente):
  - Horarios
  - Localización
  - Animales
  - Ecosistemas
- Membership
- Courses
- Activities

### Concretos
- **Form:**
  - Darse de alta como socio/miembro
  - Comprar una entrada/ticket
  - Apuntarse a una actividad
  - Apuntarse a un curso

## SERVICIOS

- **Language-service:** para la elección de idioma
- **Theme-service:** para la elección del tema
- **Ticket-service:** para la compra de entradas
- **Membership-service:** para darse de alta como socio
- **Activity-service:** para darse de alta en una actividad
- **Course-service:** para darse de alta en un curso

## NOTAS TÉCNICAS

Con respecto a la funcionalidad relacionada con la compra de entradas, decidí primero tener dicha característica funcionando de manera básica y esperar a crear la funcionalidad del login para añadir a los miembros en la ecuación.

El flujo transcurre desde que el usuario introduce el número de personas que desean una entrada hasta que se muestra una confirmación. Por el camino, una vez que se introducen las cantidades, un servicio se encarga de contear y calcular los precios. El usuario pulsa a comprar la entrada, en ese momento, mediante el Factory, se crea un objeto ticket con sus características. Finalmente, y esta vez usando Repository, dicha información se almacena en el localStorage del navegador.

## ESTADO ACTUAL - FASE 2.2 COMPLETADA

### ESTRUCTURA BASE COMPLETADA
- Angular 18+ (componentes standalone)
- Routing configurado con 5 páginas
- Sistema de temas funcional (ThemeService con signals)

### HOME COMPONENT IMPLEMENTADO
- Lógica de alternancia entre secciones
- Comunicación entre componentes mediante Output
- Estructura modular: secciones como componentes independientes

### FLUJO DE COMPRA DE TICKETS IMPLEMENTADO
- TicketCardComponent (UI con inputs para cantidades)
- PriceCalculatorService (cálculos reactivos con signals)
- MemberPriceStrategy / NonMemberPriceStrategy (Strategy Pattern - 50% descuento socios)
- TicketFactory (Factory Pattern - creación objetos Ticket)
- TicketRepository (Repository Pattern - persistencia localStorage)
- TicketService (orquestación - crea y guarda tickets)

### COMPONENTES CREADOS

#### Páginas (pages/)
- HomeComponent (con lógica de alternancia)
- TicketsComponent
- AnimalsComponent
- EcosystemsComponent
- MembershipComponent

#### Secciones (sections/)
- HeroComponent
- TicketPurchaseComponent (tablas + botón "Comprar")
- TicketFormComponent (pendiente - actualmente usa TicketCard)
- ParkInfoComponent
- CoursesComponent
- ActivitiesComponent

#### Comunes (components/)
- HeaderComponent
- FooterComponent
- TicketCardComponent (nuevo - formulario de compra)

### SERVICIOS IMPLEMENTADOS
- ThemeService funcional (light/dark con signals)
- PriceCalculatorService funcional (cálculos con Strategy Pattern)
- TicketService funcional (gestión tickets)
- TicketFactory funcional (Factory Pattern)
- TicketRepository funcional (Repository Pattern - localStorage)
- LanguageService (pendiente)

### TESTS UNITARIOS COMPLETADOS
- TicketCardComponent (7 tests)
- PriceCalculatorService (8 tests)
- MemberPriceStrategy (7 tests)
- NonMemberPriceStrategy (6 tests)
- TicketFactory (6 tests)
- TicketRepository (14 tests)
- TicketService (8 tests)

### MODELOS/INTERFACES
- Ticket (id, date, quantities, total)
- TicketQuantities (ADULT, CHILD, SENIOR)
- TicketPrice (type, basePrice, label)
- PriceStrategy (interface - Strategy Pattern)

### PATRONES DE DISEÑO APLICADOS
- **Strategy Pattern** - Cálculo de precios (socio vs no socio)
- **Factory Pattern** - Creación de objetos Ticket
- **Repository Pattern** - Abstracción de persistencia (localStorage)
- **Facade Pattern** - TicketService simplifica API para componentes
- **Observer Pattern** - Signals para reactividad
- **Dependency Injection** - Inyección de servicios

### FLUJO DE COMPRA FUNCIONAL
1. Usuario selecciona cantidades (Adulto, Niño, Senior)
2. Precio se calcula en tiempo real (socio: 50% descuento)
3. Click "Comprar entradas" → crea Ticket con Factory
4. Ticket se guarda en localStorage via Repository
5. Console.log muestra resumen de compra
6. Formulario se resetea automáticamente

## ACTUALIZACIÓN FASE 2.2 - VALIDACIONES Y FORMULARIOS REACTIVOS

### COMPLETADO

#### VALIDACIONES IMPLEMENTADAS EN TICKET-CARD
- **Formulario Reactivo** - Migración completa a ReactiveForms
- **Validaciones básicas:**
  - Valores mínimos: 0 (no negativos)
  - Validación personalizada: mínimo 1 ticket total
- **Feedback visual:**
  - Mensajes de error para valores negativos
  - Mensaje global para "mínimo 1 ticket"
  - Estados touched/invalid con CSS
- **Flujo mejorado:**
  - onBuyClick() valida formulario antes de procesar
  - Reset automático después de compra exitosa
  - Marcado de controles como touched para mostrar errores

#### TESTING ACTUALIZADO
- 8 tests unitarios para TicketCardComponent
- Cobertura: inicialización, validaciones, flujo de compra
- Mocks de servicios (PriceCalculatorService, TicketService)
- Verificación de integración formulario-servicios

#### CÓDIGO SIMPLIFICADO
- Eliminadas propiedades redundantes
- Eliminados handlers individuales
- Validador simplificado sin complejidad de tipos
- Constructor más limpio y legible

## PRÓXIMA FASE - SISTEMA DE SOCIOS (LOGIN)

### PLAN DE IMPLEMENTACIÓN

#### COMPONENTES NECESARIOS
- Login-form component
- Member-badge component (indicador visual en header)
- Auth service

#### SERVICIO AUTH (SIMPLIFICADO)
- Servicio básico con signal para estado isMember
- Login simulado sin backend
- Persistencia en localStorage
- Métodos login/logout/checkStorage

#### INTEGRACIÓN CON EXISTENTES
- Modificar PriceCalculatorService para usar AuthService.isMember
- El Strategy Pattern ya está preparado (MemberPriceStrategy / NonMemberPriceStrategy)
- Header: mostrar estado de socio (login/logout)
- TicketCard: indicar descuento aplicado

#### FLUJO DE USUARIO
1. Usuario hace login (simulado) → isMember = true
2. PriceCalculatorService detecta cambio → aplica MemberPriceStrategy
3. TicketCard muestra precios con 50% descuento
4. Compra se procesa normalmente

#### VENTAJAS DE ESTE ENFOQUE
- **Cohesivo:** completa la funcionalidad de "socio con 50% descuento"
- **Minimalista:** sin backend, solo estado frontend
- **Integración sencilla:** reutiliza Strategy Pattern existente
- **Preparado para expansión:** luego se puede añadir backend real

#### TESTING PLANEADO
- AuthService: login/logout, estado persistente
- Integración PriceCalculator + Auth
- Componente LoginForm

## ESTADO ACTUAL DEL PROYECTO

### COMPLETADO
- Estructura base Angular 18+
- Routing con 5 páginas
- Sistema de temas (ThemeService con signals)
- Flujo completo de compra de tickets
- 4 patrones de diseño implementados
- Testing unitario completo
- Formularios reactivos con validaciones

### PRÓXIMO (SISTEMA DE SOCIOS)
- AuthService básico
- Componente LoginForm
- Integración con cálculo de precios
- Indicador visual en header
- Persistencia en localStorage

### SECUENCIA RECOMENDADA
1. Implementar AuthService (30 min)
2. Crear LoginForm component (45 min)
3. Integrar con Header (30 min)
4. Conectar con PriceCalculator (15 min)
5. Testing (30 min)

**Estimación total:** aproximadamente 3 horas para sistema básico de socios funcional.

### DECISIONES DE ARQUITECTURA MANTENIDAS
- Componentes standalone
- Signals para estado reactivo
- Servicios con providedIn: 'root'
- ReactiveForms para formularios
- SOLID + Patrones de diseño
- Testing unitario con Jasmine/Karma