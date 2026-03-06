export interface Animal {
  id: number;
  nombre: string;
  nombreCientifico: string;
  descripcion: string;
  imagen: string;
  dieta: 'herbívoro' | 'carnívoro' | 'omnívoro' | 'insectívoro';
  ecosistemaId: number;
  continente: string;
  estadoConservacion: 'preocupación menor' | 'vulnerable' | 'en peligro' | 'en peligro crítico' | 'extinto';
  esperanzaVida: number; // en años
  pesoMinimo: number; // en kg
  pesoMaximo: number; // en kg
  curiosidades: string[];
}