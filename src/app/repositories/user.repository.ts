// src/app/features/auth/repositories/user.repository.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserRepository {
  private readonly DB_NAME = 'ZooUsersDB';
  private readonly STORE_NAME = 'users';
  private readonly DB_VERSION = 1;
  
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
        
        request.onerror = () => reject(new Error(request.error?.message || 'Database initialization failed'));
        
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          
          // Crear object store si no existe
          if (!db.objectStoreNames.contains(this.STORE_NAME)) {
            const store = db.createObjectStore(this.STORE_NAME, { 
              keyPath: 'id' 
            });
            
            // Crear índice único para email (para login futuro)
            store.createIndex('email', 'email', { unique: true });
            
            // Índice para búsquedas comunes
            store.createIndex('isMember', 'isMember', { unique: false });
            store.createIndex('createdAt', 'createdAt', { unique: false });
          }
        };
      });
    }
    
    return this.dbPromise;
  }

  async save(user: User): Promise<void> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.put(user);
      
      request.onerror = () => reject(new Error(request.error?.message || 'Save operation failed'));
      request.onsuccess = () => resolve();
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);
      
      request.onerror = () => reject(new Error(request.error?.message || 'Find by ID failed'));
      request.onsuccess = () => resolve(request.result);
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const index = store.index('email');
      const request = index.get(email);
      
      request.onerror = () => reject(new Error(request.error?.message || 'Find by email failed'));
      request.onsuccess = () => resolve(request.result);
    });
  }

  async findAll(): Promise<User[]> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();
      
      request.onerror = () => reject(new Error(request.error?.message || 'Find all failed'));
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(id: string): Promise<void> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);
      
      request.onerror = () => reject(new Error(request.error?.message || 'Delete failed'));
      request.onsuccess = () => resolve();
    });
  }

  async count(): Promise<number> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.count();
      
      request.onerror = () => reject(new Error(request.error?.message || 'Count failed'));
      request.onsuccess = () => resolve(request.result);
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }

  async findMembers(): Promise<User[]> {
    const db = await this.initDatabase();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const index = store.index('isMember');
      const request = index.getAll(IDBKeyRange.only(true));
      
      request.onerror = () => reject(new Error(request.error?.message || 'Find members failed'));
      request.onsuccess = () => resolve(request.result);
    });
  }

  async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.DB_NAME);
      
      request.onerror = () => reject(new Error(request.error?.message || 'Clear database failed'));
      request.onsuccess = () => {
        this.dbPromise = null;
        resolve();
      };
    });
  }
}