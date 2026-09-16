import { storage } from '../storage/storage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

const STORAGE_KEY = 'cart_items';

class CartStore {
  private items: CartItem[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const saved = await storage.getItem(STORAGE_KEY);
      if (saved) {
        this.items = JSON.parse(saved);
        this.notify();
      }
    } catch (e) {
      console.error('CartStore init error:', e);
    }
  }

  private save() {
    storage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
    this.save();
  }

  addItem(item: Omit<CartItem, 'quantity'>) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.notify();
  }

  removeItem(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
    this.notify();
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.notify();
    }
  }

  clearCart() {
    this.items = [];
    this.notify();
  }
}

export const cartStore = new CartStore();
