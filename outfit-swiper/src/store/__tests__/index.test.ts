import { useOutfitStore } from '../index';

describe('useOutfitStore', () => {
  beforeEach(() => {
    // Reset store to known clean state before each test
    useOutfitStore.setState({
      clothes: [],
      collections: [
        { id: 'col-spring', name: '春', itemIds: [], isDefault: true },
        { id: 'col-summer', name: '夏', itemIds: [], isDefault: true },
        { id: 'col-autumn', name: '秋', itemIds: [], isDefault: true },
        { id: 'col-winter', name: '冬', itemIds: [], isDefault: true },
      ],
      macroOrder: ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'],
      currentOutfit: {},
    });
  });

  describe('removeClothingItem', () => {
    it('should remove an item from clothes array and all collections', () => {
      // 1. Arrange: setup initial state with an item to remove
      const itemIdToRemove = 'test-id-1';
      const itemIdToKeep = 'test-id-2';

      useOutfitStore.setState({
        clothes: [
          { id: itemIdToRemove, name: 'T-Shirt to remove', part: 'トップス' },
          { id: itemIdToKeep, name: 'Pants to keep', part: 'パンツ' },
        ],
        collections: [
          { id: 'col-summer', name: '夏', itemIds: [itemIdToRemove, itemIdToKeep], isDefault: true },
          { id: 'col-winter', name: '冬', itemIds: [itemIdToKeep], isDefault: true },
        ]
      });

      // 2. Act: remove the item
      useOutfitStore.getState().removeClothingItem(itemIdToRemove);

      // 3. Assert: check the new state
      const state = useOutfitStore.getState();

      // Should be removed from clothes array
      expect(state.clothes).toHaveLength(1);
      expect(state.clothes[0].id).toBe(itemIdToKeep);

      // Should be removed from collections
      const summerCollection = state.collections.find(c => c.id === 'col-summer');
      expect(summerCollection?.itemIds).toHaveLength(1);
      expect(summerCollection?.itemIds).toContain(itemIdToKeep);
      expect(summerCollection?.itemIds).not.toContain(itemIdToRemove);

      const winterCollection = state.collections.find(c => c.id === 'col-winter');
      expect(winterCollection?.itemIds).toHaveLength(1);
      expect(winterCollection?.itemIds).toContain(itemIdToKeep);
    });

    it('should handle removing a non-existent item gracefully', () => {
      const existingItemId = 'existing-1';

      useOutfitStore.setState({
        clothes: [{ id: existingItemId, name: 'Existing Item', part: 'トップス' }],
        collections: [{ id: 'col-1', name: 'Col 1', itemIds: [existingItemId] }]
      });

      // Act
      useOutfitStore.getState().removeClothingItem('non-existent-id');

      // Assert state hasn't changed inappropriately
      const state = useOutfitStore.getState();
      expect(state.clothes).toHaveLength(1);
      expect(state.clothes[0].id).toBe(existingItemId);
      expect(state.collections[0].itemIds).toContain(existingItemId);
    });
  });
});
