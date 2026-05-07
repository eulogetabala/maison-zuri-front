import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface FavoritesState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.find((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'maison-zuri-favorites-storage',
    }
  )
);
