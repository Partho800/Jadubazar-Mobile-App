import { storage } from '../storage/storage';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const STORAGE_KEY = 'wishlist_items';

class WishlistStore {
  private items: WishlistItem[] = [];
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
      console.error('WishlistStore init error:', e);
    }
  }

  private save() {
    storage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  getItems(): WishlistItem[] {
    return this.items;
  }

  isInWishlist(id: string): boolean {
    return this.items.some((i) => i.id === id);
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

  toggleWishlist(item: WishlistItem) {
    if (this.isInWishlist(item.id)) {
      this.items = this.items.filter((i) => i.id !== item.id);
    } else {
      this.items.push(item);
    }
    this.notify();
  }
}

export const wishlistStore = new WishlistStore();
