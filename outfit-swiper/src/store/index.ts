import { create } from 'zustand';
import { ClothingItem, Category, Outfit } from '../types';

interface OutfitState {
  clothes: ClothingItem[];
  macroOrder: Category[];
  currentOutfit: Outfit;
  addClothingItem: (item: Omit<ClothingItem, 'id'>) => void;
  setMacroOrder: (order: Category[]) => void;
  setOutfitItem: (category: Category, item: ClothingItem) => void;
  resetOutfit: () => void;
  addMockClothes: () => void;
}

export const useOutfitStore = create<OutfitState>((set) => ({
  clothes: [],
  macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'],
  currentOutfit: {},

  addClothingItem: (item) =>
    set((state) => ({
      clothes: [...state.clothes, { ...item, id: Date.now().toString() }],
    })),

  setMacroOrder: (order) => set({ macroOrder: order }),

  setOutfitItem: (category, item) =>
    set((state) => ({
      currentOutfit: { ...state.currentOutfit, [category]: item },
    })),

  resetOutfit: () => set({ currentOutfit: {} }),

  addMockClothes: () => {
    const mocks: ClothingItem[] = [
      { id: '1', name: '黒のダウンジャケット', category: 'アウター', season: 'winter', style: 'casual' },
      { id: '2', name: 'デニムジャケット', category: 'アウター', season: 'spring', style: 'casual' },
      { id: '3', name: '白Tシャツ', category: 'トップス', season: 'all', style: 'casual' },
      { id: '4', name: '黒のスラックス', category: 'パンツ', season: 'all', style: 'formal' },
      { id: '5', name: 'ブルージーンズ', category: 'パンツ', season: 'all', style: 'casual' },
      { id: '6', name: '白スニーカー', category: 'シューズ', season: 'all', style: 'casual' },
    ];
    set({ clothes: mocks });
  },
}));