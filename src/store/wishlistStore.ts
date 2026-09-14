export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

class WishlistStore {
  private items: WishlistItem[] = [];
  private listeners: Array<() => void> = [];

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
