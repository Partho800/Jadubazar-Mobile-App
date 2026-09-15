import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProductData {
  id: string;
  title: string;
  brand?: string;
  category?: string;
  image?: any;
  imageUrl?: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  reviewsCount?: number;
  discount?: string;
  discountBadge?: string;
  description?: string;
  weight?: string;
  status?: string;
  sizes?: { label: string; price: string; oldPrice?: string }[];
}

interface ProductContextType {
  selectedProduct: ProductData | null;
  openProductDetails: (product?: Partial<ProductData>) => void;
  closeProductDetails: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const DEFAULT_IPHONE_PRODUCT: ProductData = {
  id: 'iphone-14-pro-max',
  title: 'iPhone 14 Pro Max',
  brand: 'Apple',
  category: 'ECOMMERCE',
  imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
  price: '৳520835',
  oldPrice: '৳562500',
  rating: 4.9,
  reviewsCount: 412,
  discountBadge: '8% OFF',
  description: 'Dynamic Island, Always-On 120Hz ProMotion Super Retina XDR display, A16 Bionic chip, and a pro 48MP quad-pixel camera system with Action mode.',
  weight: '1kg',
  status: 'In Stock',
  sizes: [
    { label: '1kg', price: '৳520835', oldPrice: '৳562500' },
    { label: '500gm', price: '৳260415', oldPrice: '৳281250' },
    { label: '250gm', price: '৳130210', oldPrice: '৳140625' },
    { label: '240gm', price: '৳125000', oldPrice: '৳135000' },
    { label: '100gm', price: '৳52085', oldPrice: '৳56250' },
  ],
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const openProductDetails = (product?: Partial<ProductData>) => {
    if (!product) {
      setSelectedProduct(DEFAULT_IPHONE_PRODUCT);
      return;
    }

    const fullProduct: ProductData = {
      id: product.id || DEFAULT_IPHONE_PRODUCT.id,
      title: product.title || DEFAULT_IPHONE_PRODUCT.title,
      brand: product.brand || DEFAULT_IPHONE_PRODUCT.brand,
      category: product.category || DEFAULT_IPHONE_PRODUCT.category,
      image: product.image,
      imageUrl: product.imageUrl || (typeof product.image === 'string' ? product.image : DEFAULT_IPHONE_PRODUCT.imageUrl),
      price: product.price || DEFAULT_IPHONE_PRODUCT.price,
      oldPrice: product.oldPrice || DEFAULT_IPHONE_PRODUCT.oldPrice,
      rating: product.rating || DEFAULT_IPHONE_PRODUCT.rating,
      reviewsCount: product.reviewsCount || DEFAULT_IPHONE_PRODUCT.reviewsCount,
      discountBadge: product.discountBadge || product.discount || DEFAULT_IPHONE_PRODUCT.discountBadge,
      description: product.description || DEFAULT_IPHONE_PRODUCT.description,
      weight: product.weight || DEFAULT_IPHONE_PRODUCT.weight,
      status: product.status || DEFAULT_IPHONE_PRODUCT.status,
      sizes: product.sizes || DEFAULT_IPHONE_PRODUCT.sizes,
    };
    setSelectedProduct(fullProduct);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        openProductDetails,
        closeProductDetails,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
