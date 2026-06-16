import { useOutfitStore } from './index';
import { Platform } from 'react-native';

describe('useOutfitStore', () => {
  beforeEach(() => {
    useOutfitStore.getState().clearAll();
  });

  it('initial state is correct', () => {
    const state = useOutfitStore.getState();
    expect(state.clothes).toEqual([]);
    expect(state.macroOrder).toEqual(['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー']);
    expect(state.currentOutfit).toEqual({});
    expect(state.collections).toHaveLength(4);
    expect(state.collections[0].isDefault).toBe(true);
  });

  it('addClothingItem adds an item to clothes', () => {
    useOutfitStore.getState().addClothingItem({
      name: 'Black Jacket',
      part: 'アウター',
    });

    const state = useOutfitStore.getState();
    expect(state.clothes).toHaveLength(1);
    expect(state.clothes[0].name).toBe('Black Jacket');
    expect(state.clothes[0].part).toBe('アウター');
    expect(state.clothes[0].id).toBeDefined();
  });

  it('removeClothingItem removes an item from clothes and collections', () => {
    useOutfitStore.getState().addClothingItem({
      name: 'Black Jacket',
      part: 'アウター',
    });

    let state = useOutfitStore.getState();
    const itemId = state.clothes[0].id;

    // Assign to a collection
    const springCollection = state.collections.find(c => c.name === '春');
    if (springCollection) {
        useOutfitStore.getState().assignItemToCollection(itemId, springCollection.id);
    }

    state = useOutfitStore.getState();
    const updatedSpringCollection = state.collections.find(c => c.name === '春');
    expect(updatedSpringCollection?.itemIds).toContain(itemId);

    // Remove
    useOutfitStore.getState().removeClothingItem(itemId);

    state = useOutfitStore.getState();
    expect(state.clothes).toHaveLength(0);
    const finalSpringCollection = state.collections.find(c => c.name === '春');
    expect(finalSpringCollection?.itemIds).not.toContain(itemId);
  });

  it('addCollection adds a new collection', () => {
    useOutfitStore.getState().addCollection('My Collection');
    const state = useOutfitStore.getState();
    expect(state.collections).toHaveLength(5);
    const newCollection = state.collections[4];
    expect(newCollection.name).toBe('My Collection');
    expect(newCollection.id).toMatch(/^col-\d+$/);
    expect(newCollection.itemIds).toEqual([]);
  });

  it('removeCollection removes a non-default collection', () => {
    useOutfitStore.getState().addCollection('My Collection');
    let state = useOutfitStore.getState();
    expect(state.collections).toHaveLength(5);
    const newId = state.collections[4].id;

    useOutfitStore.getState().removeCollection(newId);
    state = useOutfitStore.getState();
    expect(state.collections).toHaveLength(4);
    expect(state.collections.find(c => c.id === newId)).toBeUndefined();
  });

  it('removeCollection does not remove default collections', () => {
    const springId = useOutfitStore.getState().collections.find(c => c.name === '春')?.id;
    if (springId) {
        useOutfitStore.getState().removeCollection(springId);
        const state = useOutfitStore.getState();
        expect(state.collections).toHaveLength(4);
        expect(state.collections.find(c => c.id === springId)).toBeDefined();
    }
  });

  it('assignItemToCollection and removeItemFromCollection', () => {
    useOutfitStore.getState().addClothingItem({
      name: 'White T-Shirt',
      part: 'トップス',
    });

    let state = useOutfitStore.getState();
    const itemId = state.clothes[0].id;
    const summerCollectionId = state.collections.find(c => c.name === '夏')?.id;

    if (summerCollectionId) {
        useOutfitStore.getState().assignItemToCollection(itemId, summerCollectionId);
        state = useOutfitStore.getState();
        expect(state.collections.find(c => c.id === summerCollectionId)?.itemIds).toContain(itemId);

        // Cannot add same item twice
        useOutfitStore.getState().assignItemToCollection(itemId, summerCollectionId);
        state = useOutfitStore.getState();
        expect(state.collections.find(c => c.id === summerCollectionId)?.itemIds.filter(id => id === itemId)).toHaveLength(1);

        useOutfitStore.getState().removeItemFromCollection(itemId, summerCollectionId);
        state = useOutfitStore.getState();
        expect(state.collections.find(c => c.id === summerCollectionId)?.itemIds).not.toContain(itemId);
    }
  });

  it('setMacroOrder updates the order of parts', () => {
    const newOrder: any = ['トップス', 'パンツ', 'アウター', 'シューズ', 'アクセサリー'];
    useOutfitStore.getState().setMacroOrder(newOrder);
    const state = useOutfitStore.getState();
    expect(state.macroOrder).toEqual(newOrder);
  });

  it('setOutfitItem and resetOutfit', () => {
    const item: any = { id: 'test', name: 'Shoes', part: 'シューズ' };
    useOutfitStore.getState().setOutfitItem('シューズ', item);
    let state = useOutfitStore.getState();
    expect(state.currentOutfit['シューズ']).toEqual(item);

    useOutfitStore.getState().resetOutfit();
    state = useOutfitStore.getState();
    expect(state.currentOutfit).toEqual({});
  });

  it('addMockData adds mock items and populates collections', () => {
    useOutfitStore.getState().addMockData();
    const state = useOutfitStore.getState();
    expect(state.clothes).toHaveLength(3);
    expect(state.collections.find(c => c.id === 'col-winter')?.itemIds).toEqual(['1', '3']);
    expect(state.collections.find(c => c.id === 'col-summer')?.itemIds).toEqual(['2']);

    // Test that adding mock data again does not duplicate items
    useOutfitStore.getState().addMockData();
    const state2 = useOutfitStore.getState();
    expect(state2.clothes).toHaveLength(3);
  });

  describe('partialize for web', () => {
    let originalPlatformOS: typeof Platform.OS;

    beforeAll(() => {
      originalPlatformOS = Platform.OS;
    });

    afterAll(() => {
      Platform.OS = originalPlatformOS;
    });

    it('strips large base64 images on web platform', () => {
      Platform.OS = 'web';

      const smallImageUrl = 'data:image/jpeg;base64,small';
      const largeImageUrl = 'data:image/jpeg;base64,' + 'a'.repeat(500001);

      useOutfitStore.getState().addClothingItem({
        name: 'Small Image Item',
        part: 'トップス',
        imageUrl: smallImageUrl,
      });

      useOutfitStore.getState().addClothingItem({
        name: 'Large Image Item',
        part: 'パンツ',
        imageUrl: largeImageUrl,
      });

      const state = useOutfitStore.getState();

      // We need to test the partialize function directly since the persist middleware
      // doesn't immediately call it when we add an item
      const persistOptions = (useOutfitStore as any).persist.getOptions();
      const partializedState = persistOptions.partialize(state);

      const smallImageItem = partializedState.clothes.find((c: any) => c.name === 'Small Image Item');
      const largeImageItem = partializedState.clothes.find((c: any) => c.name === 'Large Image Item');

      expect(smallImageItem.imageUrl).toBe(smallImageUrl);
      expect(largeImageItem.imageUrl).toBeUndefined();
    });

    it('does not strip large base64 images on native platform', () => {
      Platform.OS = 'ios';

      const largeImageUrl = 'data:image/jpeg;base64,' + 'a'.repeat(500001);

      useOutfitStore.getState().addClothingItem({
        name: 'Native Large Image Item',
        part: 'アウター',
        imageUrl: largeImageUrl,
      });

      const state = useOutfitStore.getState();

      const persistOptions = (useOutfitStore as any).persist.getOptions();
      const partializedState = persistOptions.partialize(state);

      const largeImageItem = partializedState.clothes.find((c: any) => c.name === 'Native Large Image Item');
      expect(largeImageItem.imageUrl).toBe(largeImageUrl);
    });
  });
});
