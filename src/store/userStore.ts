export interface AddressItem {
  id: string;
  title: string;
  fullAddress: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

class UserStore {
  private addresses: AddressItem[] = [];
  private listeners: Array<() => void> = [];

  getAddresses(): AddressItem[] {
    return this.addresses;
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

  addAddress(address: AddressItem) {
    this.addresses.push(address);
    this.notify();
  }
}

export const userStore = new UserStore();
