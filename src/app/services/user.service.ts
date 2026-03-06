import { Injectable, inject } from '@angular/core';

// factorías
import { UserFactory } from '../factories/user.factory';

// repositorios
import { UserRepository } from '../repositories/user.repository';

// modelos
import { User } from '../models/user.interface';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  agreeToTerms: boolean;
  becomeMember?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly factory = inject(UserFactory);
  private readonly repository = inject(UserRepository);

  async register(userData: UserRegistrationData): Promise<User | null> {
    // Validación básica
    if (!userData.agreeToTerms) {
      throw new Error('Debes aceptar los términos y condiciones');
    }

    // Verificar email único
    const emailExists = await this.repository.emailExists(userData.email);
    if (emailExists) {
      return null; // O lanzar error: throw new Error('Email ya registrado');
    }

    // Crear usuario
    const user = this.factory.createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      age: userData.age,
      isMember: userData.becomeMember ?? false
    });

    // Guardar
    await this.repository.save(user);

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findByEmail(email);
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.repository.findById(id);
    return user || null;
  }

  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.repository.save(updatedUser);
    return updatedUser;
  }

  async makeMember(userId: string): Promise<User | null> {
    return this.updateUser(userId, { isMember: true });
  }

  async cancelMembership(userId: string): Promise<User | null> {
    return this.updateUser(userId, { isMember: false });
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const exists = await this.repository.emailExists(email);
    return !exists;
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getMembers(): Promise<User[]> {
    return this.repository.findMembers();
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch {
      return false;
    }
  }

  async getStats(): Promise<{
    totalUsers: number;
    totalMembers: number;
    averageAge: number;
  }> {
    const allUsers = await this.getAllUsers();
    const members = await this.getMembers();

    const totalAge = allUsers.reduce((sum, user) => sum + user.age, 0);

    return {
      totalUsers: allUsers.length,
      totalMembers: members.length,
      averageAge: allUsers.length > 0 ? Math.round(totalAge / allUsers.length) : 0
    };
  }

  validateRegistrationData(data: UserRegistrationData): string[] {
    const errors: string[] = [];

    if (!data.firstName?.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!data.lastName?.trim()) {
      errors.push('El apellido es requerido');
    }

    if (!data.email?.trim()) {
      errors.push('El email es requerido');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('El email no es válido');
    }

    if (!data.password || data.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }


    if (!data.age || data.age < 0 || data.age > 120) {
      errors.push('La edad debe estar entre 0 y 120 años');
    }

    if (!data.agreeToTerms) {
      errors.push('Debes aceptar los términos y condiciones');
    }

    return errors;
  }

  getTicketAgeGroup(age: number): 'CHILD' | 'ADULT' | 'SENIOR' {
    // Usa el mismo método que el factory para consistencia
    if (typeof (this.factory as any).getAgeGroup === 'function') {
      return (this.factory as any).getAgeGroup(age);
    }

    // Fallback
    if (age < 13) return 'CHILD';
    if (age < 65) return 'ADULT';
    return 'SENIOR';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
