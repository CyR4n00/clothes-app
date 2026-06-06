import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ClothingItem, Category, Outfit } from '../types';

interface OutfitState {
  clothes: ClothingItem[];
  macroOrder: Category[];
  currentOutfit: Outfit;
  customCategories: string[];
  addClothingItem: (item: Omit<ClothingItem, 'id'>) => void;
  setMacroOrder: (order: Category[]) => void;
  setOutfitItem: (category: Category, item: ClothingItem) => void;
  addCustomCategory: (category: string) => void;
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
      customCategories: [],

      addClothingItem: (item) =>
        set((state) => ({
          clothes: [...state.clothes, { ...item, id: Date.now().toString() }],
        })),

      setMacroOrder: (order) => set({ macroOrder: order }),

      setOutfitItem: (category, item) =>
        set((state) => ({
          currentOutfit: { ...state.currentOutfit, [category]: item },
        })),

      addCustomCategory: (category) =>
        set((state) => {
          if (!state.customCategories.includes(category)) {
             return { customCategories: [...state.customCategories, category] };
          }
          return state;
        }),

      resetOutfit: () => set({ currentOutfit: {} }),

      addMockClothes: () => {
        const mocks: ClothingItem[] = [
          { id: '1', name: '黒のダウンジャケット', category: 'アウター', season: '冬', style: 'カジュアル', tags: ['防寒', 'ヘビロテ'] },
          { id: '2', name: 'デニムジャケット', category: 'アウター', season: '春', style: 'カジュアル', tags: ['ビンテージ'] },
          { id: '3', name: '白Tシャツ', category: 'トップス', season: '通年', style: 'カジュアル', tags: ['インナー', '無地'] },
          { id: '4', name: '黒のスラックス', category: 'パンツ', season: '通年', style: 'フォーマル', tags: ['仕事用', 'きれいめ'] },
          { id: '5', name: 'ブルージーンズ', category: 'パンツ', season: '通年', style: 'カジュアル', tags: ['休日', 'お気に入り'] },
          { id: '6', name: '白スニーカー', category: 'シューズ', season: '通年', style: 'カジュアル', tags: ['歩きやすい'] },
        ];
        // 既存の服がなければモックを追加
        set((state) => {
          if (state.clothes.length === 0) {
            return { clothes: mocks };
          }
          return state;
        });
      },

      clearAll: () => set({ clothes: [], currentOutfit: {}, customCategories: [], macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'] }),
    }),
    {
      name: 'outfit-storage', // AsyncStorageに保存されるキー名
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        // If on web, we might not want to persist base64 images to localStorage to avoid QuotaExceededError
        if (Platform.OS === 'web') {
          return {
            ...state,
            clothes: state.clothes.map(item => ({
              ...item,
              // Keep image if it's a short URL or mock, strip if it's a huge data URI on web
              imageUrl: item.imageUrl && item.imageUrl.startsWith('data:image') && item.imageUrl.length > 500000
                        ? undefined : item.imageUrl
            }))
          };
        }
        return state;
      },
    }
  )
);