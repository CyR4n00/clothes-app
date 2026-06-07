import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ClothingItem, CategoryDefinition, Outfit } from '../types';

interface OutfitState {
  clothes: ClothingItem[];
  categories: CategoryDefinition[];
  macroOrder: string[]; // array of category IDs
  currentOutfit: Outfit;

  // Actions
  addClothingItem: (item: Omit<ClothingItem, 'id'>) => void;
  removeClothingItem: (id: string) => void;

  addCategory: (name: string) => void;
  removeCategory: (id: string) => void;

  assignItemToCategory: (itemId: string, categoryId: string) => void;
  removeItemFromCategory: (itemId: string, categoryId: string) => void;

  setMacroOrder: (order: string[]) => void;
  setOutfitItem: (categoryId: string, item: ClothingItem) => void;
  resetOutfit: () => void;

  addMockData: () => void;
  clearAll: () => void;
}

export const useOutfitStore = create<OutfitState>()(
  persist(
    (set) => ({
      clothes: [],
      categories: [
        { id: 'cat-1', name: 'アウター', itemIds: [] },
        { id: 'cat-2', name: 'トップス', itemIds: [] },
        { id: 'cat-3', name: 'パンツ', itemIds: [] },
      ],
      macroOrder: ['cat-1', 'cat-2', 'cat-3'],
      currentOutfit: {},

      addClothingItem: (item) =>
        set((state) => ({
          clothes: [...state.clothes, { ...item, id: Date.now().toString() }],
        })),

      removeClothingItem: (id) =>
        set((state) => ({
          clothes: state.clothes.filter(c => c.id !== id),
          categories: state.categories.map(cat => ({
            ...cat,
            itemIds: cat.itemIds.filter(itemId => itemId !== id)
          }))
        })),

      addCategory: (name) =>
        set((state) => {
          const newId = `cat-${Date.now()}`;
          return {
            categories: [...state.categories, { id: newId, name, itemIds: [] }],
            macroOrder: [...state.macroOrder, newId]
          };
        }),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(c => c.id !== id),
          macroOrder: state.macroOrder.filter(catId => catId !== id),
          currentOutfit: Object.fromEntries(Object.entries(state.currentOutfit).filter(([k]) => k !== id))
        })),

      assignItemToCategory: (itemId, categoryId) =>
        set((state) => ({
          categories: state.categories.map(cat =>
            cat.id === categoryId && (!cat.itemIds.includes(itemId))
              ? { ...cat, itemIds: [...cat.itemIds, itemId] }
              : cat
          )
        })),

      removeItemFromCategory: (itemId, categoryId) =>
        set((state) => ({
          categories: state.categories.map(cat =>
            cat.id === categoryId
              ? { ...cat, itemIds: cat.itemIds.filter(id => id !== itemId) }
              : cat
          )
        })),

      setMacroOrder: (order) => set({ macroOrder: order }),

      setOutfitItem: (categoryId, item) =>
        set((state) => ({
          currentOutfit: { ...state.currentOutfit, [categoryId]: item },
        })),

      resetOutfit: () => set({ currentOutfit: {} }),

      addMockData: () => {
        const mockClothes: ClothingItem[] = [
          { id: '1', name: '黒のダウンジャケット', tags: ['防寒', '冬'] },
          { id: '2', name: '白Tシャツ', tags: ['インナー', '無地'] },
          { id: '3', name: '黒のスラックス', tags: ['仕事用', 'きれいめ'] },
        ];
        set((state) => {
          if (state.clothes.length === 0) {
            return {
              clothes: mockClothes,
              categories: [
                { id: 'cat-1', name: 'アウター', itemIds: ['1'] },
                { id: 'cat-2', name: 'トップス', itemIds: ['2'] },
                { id: 'cat-3', name: 'パンツ', itemIds: ['3'] },
              ],
              macroOrder: ['cat-1', 'cat-2', 'cat-3']
            };
          }
          return state;
        });
      },

      clearAll: () => set({
        clothes: [],
        currentOutfit: {},
        categories: [
          { id: 'cat-1', name: 'アウター', itemIds: [] },
          { id: 'cat-2', name: 'トップス', itemIds: [] },
          { id: 'cat-3', name: 'パンツ', itemIds: [] },
        ],
        macroOrder: ['cat-1', 'cat-2', 'cat-3']
      }),
    }),
    {
      name: 'outfit-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (Platform.OS === 'web') {
          return {
            ...state,
            clothes: state.clothes.map(item => ({
              ...item,
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
