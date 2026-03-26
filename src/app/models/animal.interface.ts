import { LocalizedString } from "./localize.interface";

export interface Animal {
  id: number;
  nombre: LocalizedString;
  nombreCientifico: string;
  descripcion: LocalizedString;
  imagen: string;
  dieta: LocalizedString;
  ecosistemaId: number;
  continente: string;
  estadoConservacion: LocalizedString;
  esperanzaVida: number;
  pesoMinimo: number;
  pesoMaximo: number;
  curiosidades: LocalizedString[];
}