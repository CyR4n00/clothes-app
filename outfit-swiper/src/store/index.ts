import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  clearAll: () => void;
}

export const useOutfitStore = create<OutfitState>()(
  persist(
    (set) => ({
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
          { id: '1', name: '黒のダウンジャケット', category: 'アウター', season: '冬', style: 'カジュアル' },
          { id: '2', name: 'デニムジャケット', category: 'アウター', season: '春', style: 'カジュアル' },
          { id: '3', name: '白Tシャツ', category: 'トップス', season: '通年', style: 'カジュアル' },
          { id: '4', name: '黒のスラックス', category: 'パンツ', season: '通年', style: 'フォーマル' },
          { id: '5', name: 'ブルージーンズ', category: 'パンツ', season: '通年', style: 'カジュアル' },
          { id: '6', name: '白スニーカー', category: 'シューズ', season: '通年', style: 'カジュアル' },
        ];
        // 既存の服がなければモックを追加
        set((state) => {
          if (state.clothes.length === 0) {
            return { clothes: mocks };
          }
          return state;
        });
      },

      clearAll: () => set({ clothes: [], currentOutfit: {}, macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'] }),
    }),
    {
      name: 'outfit-storage', // AsyncStorageに保存されるキー名
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);