import { Injectable, inject, signal } from '@angular/core';

// modelos
import { User } from '../../../core/user/models/user.interface';

// servicios
import { UserService } from '../../../core/user/services/user.service';
import { PriceCalculatorService } from '../../../core/pricing/services/price-calculator.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private readonly userService = inject(UserService);
  private readonly priceCalculator = inject(PriceCalculatorService);

  // Estado de autenticación
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);

  currentUser = this._currentUser.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();

  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.tryRestoreSession();
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    agreeToTerms: boolean;
    becomeMember?: boolean;
    password: string;
  }): Promise<User | null> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const user = await this.userService.register(userData);

      if (user) {
        // Iniciar sesión automáticamente
        this._currentUser.set(user);
        this._isAuthenticated.set(true);

        // Sincronizar estado de membresía con PriceCalculator
        this.priceCalculator.setMemberStatus(user.isMember);

        // Guardar en localStorage (sesión persistente)
        this.saveSessionToStorage(user);

        return user;
      } else {
        this.error.set('Este email ya está registrado');
        return null;
      }
    } catch (err) {
      this.error.set('Error en el registro: ' + (err as Error).message);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    this.isLoading.set(true);
    this.error.set(null);

    try {

      const user = await this.userService.getUserByEmail(credentials.email);

      if (user) {
        // para un futuro: verificar contraseña hash
        const isValid = await this.verifyPassword(
          credentials.password,
          user.password);

        if (!isValid) {
          this.error.set('Contraseña incorrecta');
          return false;
        }

        this._currentUser.set(user);
        this._isAuthenticated.set(true);

        // Sincronizar estado de membresía
        this.priceCalculator.setMemberStatus(user.isMember);

        // Guardar sesión
        this.saveSessionToStorage(user);

        return true;
      } else {
        this.error.set('Usuario no encontrado');
        return false;
      }
    } catch (err) {
      this.error.set('Error en el login: ' + (err as Error).message);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  logout(): void {
    const userEmail = this._currentUser()?.email;

    // Limpiar estado
    this._currentUser.set(null);
    this._isAuthenticated.set(false);

    // Resetear PriceCalculator (no socio)
    this.priceCalculator.setMemberStatus(false);

    // Limpiar almacenamiento
    this.clearSessionStorage();

    console.log('Sesión cerrada:', userEmail || '');
  }

  async updateMembership(isMember: boolean): Promise<boolean> {
    const user = this._currentUser();
    if (!user) {
      this.error.set('No hay usuario autenticado');
      return false;
    }

    this.isLoading.set(true);

    try {
      const updatedUser = isMember
        ? await this.userService.makeMember(user.id)
        : await this.userService.cancelMembership(user.id);

      if (updatedUser) {
        // Actualizar estado local
        this._currentUser.set(updatedUser);

        // Sincronizar con PriceCalculator
        this.priceCalculator.setMemberStatus(updatedUser.isMember);

        // Actualizar en almacenamiento
        this.saveSessionToStorage(updatedUser);

        console.log('Membresía actualizada:', updatedUser.isMember ? 'SOCIO' : 'NO SOCIO');
        return true;
      }
      return false;
    } catch (err) {
      this.error.set('Error actualizando membresía');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return this.userService.isEmailAvailable(email);
  }

  getMembershipStatus(): boolean {
    return this._currentUser()?.isMember ?? false;
  }

  private saveSessionToStorage(user: User): void {
    try {
      localStorage.setItem('zoo_current_user_id', user.id);
      // para un futuro: guardar más datos o token JWT
    } catch (err) {
      console.warn('No se pudo guardar sesión en localStorage:', err);
    }
  }

  private async tryRestoreSession(): Promise<void> {
    try {
      const userId = localStorage.getItem('zoo_current_user_id');

      if (userId) {
        const user = await this.userService.getUserById(userId);

        if (user) {
          this._currentUser.set(user);
          this._isAuthenticated.set(true);
          this.priceCalculator.setMemberStatus(user.isMember);
          console.log('Sesión restaurada:', user.email);
        } else {
          // ID inválido, limpiar
          this.clearSessionStorage();
        }
      }
    } catch (err) {
      console.warn('Error restaurando sesión:', err);
      this.clearSessionStorage();
    }
  }

  private clearSessionStorage(): void {
    localStorage.removeItem('zoo_current_user_id');
  }

  private async verifyPassword(
    inputPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return Promise.resolve(inputPassword === storedPassword);
  }
}
