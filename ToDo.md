# FUNCIONALIDADES POR IMPLEMENTAR

## Por prioridad

### Alta

- **Header con estado de sesión - Mostrar usuario actual + logout**

- **Página membresía/gestión - Cambiar estado socio post-registro**

- **Integración UI tickets - Mostrar estado socio/descuento en tiempo real**

- **Logout desde UI - No solo programático**

### Media

- **Validaciones formularios - Mejor UX/feedback**

- **Mensajes toast/alert - Confirmaciones éxito/error**

- **Perfil de usuario - Ver/editar datos personales**

- **Historial de compras - Tickets por usuario**

### Baja

- **Sistema de contraseñas - Hash + seguridad**

- **Roles de usuario - Admin vs usuario normal**

- **Dashboard admin - Gestión usuarios/tickets**

- **API simulada - Backend fake para prácticas**

- **Responsive design - Mobile optimization**

- **Internacionalización - LanguageService ya creado**

## COMPRA DE ENTRADAS

### Patrones de diseño

- Factory para la creación de entradas

- Builder para TicketService: TicketBuilder para crear tickets

- State para el flujo de compra: estado de la compra -> (next, previous, cancel)

- Strategy para el cálculo de los descuentos: DiscountStrategy

- Command para acciones como deshacer compra o volver atrás

- Repository para crear un repositorio de entradas en el localStorage

### No patrones

- Validador de la compra de entradas: TicketValidator
