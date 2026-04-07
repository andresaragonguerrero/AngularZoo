import { LocalizedString } from "../../../models/localize.interface";

export interface Animal {
  id: number;
  nombre: LocalizedString;
  nombreCientifico: string;
  descripcion: LocalizedString;
  imagen: string;
  dieta: LocalizedString;
  ecosistemaId: number;
  continente: LocalizedString;
  estadoConservacion: LocalizedString;
  esperanzaVida: number;
  pesoMinimo: number;
  pesoMaximo: number;
  curiosidades: LocalizedString[];
}