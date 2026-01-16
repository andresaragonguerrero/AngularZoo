# FUNCIONALIDADES POR IMPLEMENTAR

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
