// src/app/features/auth/models/user.interface.ts

export interface User {
  // Identificación única
  id: string;                     
  
  // Datos personales (requeridos)
  firstName: string;             
  lastName: string;               
  email: string;                  
  age: number;                    
  
  // Estado de socio
  isMember: boolean;              
  
  // Metadatos
  createdAt: string;             
  updatedAt: string;              
  
  // Futuras extensiones (comentadas para planificación)
  // phone?: string;              // Teléfono opcional
  // passwordHash?: string;       // Para autenticación futura
  // membershipExpiry?: string;   // Fecha expiración membresía
  // preferences?: UserPreferences; // Preferencias de notificación
}