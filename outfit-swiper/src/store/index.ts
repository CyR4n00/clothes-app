import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ClothingItem, Collection, Outfit, Part } from '../types';

interface OutfitState {
  clothes: ClothingItem[];
  collections: Collection[];
  macroOrder: Part[];
  currentOutfit: Outfit;

  // Actions
  addClothingItem: (item: Omit<ClothingItem, 'id'>) => void;
  removeClothingItem: (id: string) => void;

  addCollection: (name: string) => void;
  removeCollection: (id: string) => void;

  assignItemToCollection: (itemId: string, collectionId: string) => void;
  removeItemFromCollection: (itemId: string, collectionId: string) => void;

  setMacroOrder: (order: Part[]) => void;
  setOutfitItem: (part: Part, item: ClothingItem) => void;
  resetOutfit: () => void;

  addMockData: () => void;
  clearAll: () => void;
}

const defaultCollections: Collection[] = [
  { id: 'col-spring', name: '春', itemIds: [], isDefault: true },
  { id: 'col-summer', name: '夏', itemIds: [], isDefault: true },
  { id: 'col-autumn', name: '秋', itemIds: [], isDefault: true },
  { id: 'col-winter', name: '冬', itemIds: [], isDefault: true },
];

export const useOutfitStore = create<OutfitState>()(
  persist(
    (set) => ({
      clothes: [],
      collections: defaultCollections,
      macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'],
      currentOutfit: {},

      addClothingItem: (item) =>
        set((state) => ({
          clothes: [...state.clothes, { ...item, id: Date.now().toString() }],
        })),

      removeClothingItem: (id) =>
        set((state) => ({
          clothes: state.clothes.filter(c => c.id !== id),
          collections: state.collections.map(col => ({
            ...col,
            itemIds: col.itemIds.filter(itemId => itemId !== id)
          }))
        })),

      addCollection: (name) =>
        set((state) => {
          const newId = `col-${Date.now()}`;
          return {
            collections: [...state.collections, { id: newId, name, itemIds: [] }]
          };
        }),

      removeCollection: (id) =>
        set((state) => ({
          collections: state.collections.filter(c => c.id !== id || c.isDefault) // cannot remove default
        })),

      assignItemToCollection: (itemId, collectionId) =>
        set((state) => ({
          collections: state.collections.map(col =>
            col.id === collectionId && (!col.itemIds.includes(itemId))
              ? { ...col, itemIds: [...col.itemIds, itemId] }
              : col
          )
        })),

      removeItemFromCollection: (itemId, collectionId) =>
        set((state) => ({
          collections: state.collections.map(col =>
            col.id === collectionId
              ? { ...col, itemIds: col.itemIds.filter(id => id !== itemId) }
              : col
          )
        })),

      setMacroOrder: (order) => set({ macroOrder: order }),

      setOutfitItem: (part, item) =>
        set((state) => ({
          currentOutfit: { ...state.currentOutfit, [part]: item },
        })),

      resetOutfit: () => set({ currentOutfit: {} }),

      addMockData: () => {
        const mockClothes: ClothingItem[] = [
          { id: '1', name: '黒のダウンジャケット', part: 'アウター', tags: ['防寒'] },
          { id: '2', name: '白Tシャツ', part: 'トップス', tags: ['インナー'] },
          { id: '3', name: '黒のスラックス', part: 'パンツ', tags: ['仕事用'] },
        ];
        set((state) => {
          if (state.clothes.length === 0) {
            return {
              clothes: mockClothes,
              collections: state.collections.map(c =>
                c.id === 'col-winter' ? { ...c, itemIds: ['1', '3'] } :
                c.id === 'col-summer' ? { ...c, itemIds: ['2'] } : c
              ),
              macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー']
            };
          }
          return state;
        });
      },

      clearAll: () => set({
        clothes: [],
        currentOutfit: {},
        collections: defaultCollections,
        macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー']
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
