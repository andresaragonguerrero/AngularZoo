import { TicketRepository } from './ticket.repository';
import { Ticket } from '../models/ticket';

describe('TicketRepository', () => {
  let repository: TicketRepository;
  const STORAGE_KEY = 'zoo_tickets';

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    repository = new TicketRepository();
  });

  afterEach(() => {
    // Limpiar después de cada test
    localStorage.clear();
  });

  it('debería guardar un ticket en localStorage', () => {
    const ticket: Ticket = {
      id: 'test-1',
      date: '2024-01-20',
      quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 },
      total: 40
    };
    
    repository.save(ticket);
    
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe('test-1');
  });

  it('debería añadir a tickets existentes', () => {
    // Primer ticket
    const ticket1: Ticket = {
      id: 'test-1',
      date: '2024-01-20',
      quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 },
      total: 20
    };
    
    const ticket2: Ticket = {
      id: 'test-2',
      date: '2024-01-21',
      quantities: { ADULT: 2, CHILD: 1, SENIOR: 0 },
      total: 52
    };
    
    repository.save(ticket1);
    repository.save(ticket2);
    
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.length).toBe(2);
    expect(stored[0].id).toBe('test-1');
    expect(stored[1].id).toBe('test-2');
  });

  it('debería retornar array vacío cuando no hay tickets', () => {
    const result = repository.findAll();
    expect(result).toEqual([]);
  });

  it('debería retornar todos los tickets guardados', () => {
    const tickets: Ticket[] = [
      { id: '1', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 },
      { id: '2', date: '2024-01-21', quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 }, total: 40 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    const result = repository.findAll();
    
    expect(result.length).toBe(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('debería encontrar ticket por ID', () => {
    const tickets: Ticket[] = [
      { id: 'find-me', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 },
      { id: 'other', date: '2024-01-21', quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 }, total: 40 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    const result = repository.findById('find-me');
    
    expect(result?.id).toBe('find-me');
  });

  it('debería retornar undefined si no encuentra el ID', () => {
    const tickets: Ticket[] = [
      { id: '1', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    const result = repository.findById('non-existent');
    
    expect(result).toBeUndefined();
  });

  it('debería eliminar ticket por ID', () => {
    const tickets: Ticket[] = [
      { id: 'delete-me', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 },
      { id: 'keep-me', date: '2024-01-21', quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 }, total: 40 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    repository.delete('delete-me');
    
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe('keep-me');
  });

  it('no debería hacer nada si el ID no existe', () => {
    const tickets: Ticket[] = [
      { id: '1', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    repository.delete('non-existent');
    
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe('1');
  });

  it('debería eliminar todos los tickets', () => {
    const tickets: Ticket[] = [
      { id: '1', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    repository.clear();
    
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeNull();
  });

  it('debería retornar el último ticket guardado', () => {
    const tickets: Ticket[] = [
      { id: 'first', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 },
      { id: 'last', date: '2024-01-21', quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 }, total: 40 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    const result = repository.findLatest();
    
    expect(result?.id).toBe('last');
  });

  it('debería retornar undefined cuando no hay tickets', () => {
    const result = repository.findLatest();
    expect(result).toBeUndefined();
  });

  it('debería retornar 0 cuando no hay tickets', () => {
    expect(repository.count()).toBe(0);
  });

  it('debería retornar el número correcto de tickets', () => {
    const tickets: Ticket[] = [
      { id: '1', date: '2024-01-20', quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 }, total: 20 },
      { id: '2', date: '2024-01-21', quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 }, total: 40 }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    
    expect(repository.count()).toBe(2);
  });

  it('debería ser instanciable', () => {
    expect(repository).toBeTruthy();
  });
});