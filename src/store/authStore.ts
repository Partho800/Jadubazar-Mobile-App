import { storage } from '../storage/storage';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
}

class AuthStore {
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  private listeners: Array<() => void> = [];

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async login(user: UserProfile, token: string) {
    this.state = { isAuthenticated: true, user, token };
    await storage.setItem('auth_token', token);
    await storage.setItem('auth_user', JSON.stringify(user));
    this.notify();
  }

  async logout() {
    this.state = { isAuthenticated: false, user: null, token: null };
    await storage.removeItem('auth_token');
    await storage.removeItem('auth_user');
    this.notify();
  }
}

export const authStore = new AuthStore();
