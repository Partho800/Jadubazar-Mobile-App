import { useState, useEffect } from 'react';
import { wishlistStore, WishlistItem } from '../store/wishlistStore';
import { useUser } from '../context/UserContext';
import { useMenuDrawer } from '../context/MenuDrawerContext';

export interface ToggleWishlistItemInput {
  id: string;
  name?: string;
  title?: string;
  price?: number | string;
  image?: string;
  imageUrl?: string;
  inStock?: boolean;
}

export const useWishlist = () => {
  const { isLoggedIn } = useUser();
  const { openMenuDrawer } = useMenuDrawer();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(wishlistStore.getItems());

  useEffect(() => {
    setWishlistItems(wishlistStore.getItems());
    const unsubscribe = wishlistStore.subscribe(() => {
      setWishlistItems([...wishlistStore.getItems()]);
    });
    return unsubscribe;
  }, []);

  const isWishlisted = (id: string): boolean => {
    return wishlistItems.some((item) => item.id === id);
  };

  const toggleWishlist = (item: ToggleWishlistItemInput): boolean => {
    if (!isLoggedIn) {
      openMenuDrawer();
      return false;
    }

    const rawPrice = item.price;
    const numericPrice =
      typeof rawPrice === 'number'
        ? rawPrice
        : parseFloat(String(rawPrice || 0).replace(/[^0-9.]/g, '')) || 0;

    const wishlistItem: WishlistItem = {
      id: item.id,
      name: item.title || item.name || 'Product',
      price: numericPrice,
      image:
        item.imageUrl ||
        item.image ||
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      inStock: item.inStock !== undefined ? item.inStock : true,
    };

    wishlistStore.toggleWishlist(wishlistItem);
    return true;
  };

  return {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    isLoggedIn,
  };
};
