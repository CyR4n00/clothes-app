import { create } from 'zustand';
import { ClothingItem, Category, Setup, UserSettings } from '../types';

interface StoreState {
  closet: ClothingItem[];
  userSettings: UserSettings;
  currentSetup: Setup;

  // Actions
  addClothingItem: (item: ClothingItem) => void;
  updateMacroOrder: (order: Category[]) => void;
  setSetupItem: (category: Category, item: ClothingItem | undefined) => void;
  clearSetup: () => void;
}

// Initial mock data
const MOCK_CLOSET: ClothingItem[] = [
  { id: '1', name: 'Black Jacket', category: 'Outerwear', season: ['Autumn', 'Winter'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Black+Jacket' },
  { id: '2', name: 'Blue Denim Jacket', category: 'Outerwear', season: ['Spring', 'Autumn'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/3b5998/FFFFFF?text=Denim+Jacket' },
  { id: '3', name: 'White T-Shirt', category: 'Tops', season: ['All'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/FFFFFF/000000?text=White+T-Shirt' },
  { id: '4', name: 'Striped Shirt', category: 'Tops', season: ['Spring', 'Summer'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/CCCCCC/000000?text=Striped+Shirt' },
  { id: '5', name: 'Blue Jeans', category: 'Bottoms', season: ['All'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/000080/FFFFFF?text=Blue+Jeans' },
  { id: '6', name: 'Black Slacks', category: 'Bottoms', season: ['All'], style: 'Formal', imageUrl: 'https://via.placeholder.com/300x400/1a1a1a/FFFFFF?text=Black+Slacks' },
  { id: '7', name: 'White Sneakers', category: 'Shoes', season: ['All'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/EEEEEE/000000?text=White+Sneakers' },
  { id: '8', name: 'Leather Boots', category: 'Shoes', season: ['Autumn', 'Winter'], style: 'Casual', imageUrl: 'https://via.placeholder.com/300x400/8B4513/FFFFFF?text=Leather+Boots' },
];

export const useStore = create<StoreState>((set) => ({
  closet: MOCK_CLOSET,
  userSettings: {
    macroOrder: ['Outerwear', 'Tops', 'Bottoms', 'Shoes'],
  },
  currentSetup: {},

  addClothingItem: (item) => set((state) => ({ closet: [...state.closet, item] })),

  updateMacroOrder: (order) => set((state) => ({
    userSettings: { ...state.userSettings, macroOrder: order }
  })),

  setSetupItem: (category, item) => set((state) => ({
    currentSetup: { ...state.currentSetup, [category]: item }
  })),

  clearSetup: () => set({ currentSetup: {} }),
}));
