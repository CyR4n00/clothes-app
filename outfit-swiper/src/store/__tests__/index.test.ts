import { useOutfitStore } from '../index';

describe('useOutfitStore - assignItemToCollection', () => {
  beforeEach(() => {
    useOutfitStore.getState().clearAll();
  });

  it('should assign an item to a collection', () => {
    useOutfitStore.getState().addCollection('My Collection');
    const state = useOutfitStore.getState();
    const collectionId = state.collections[state.collections.length - 1].id;

    useOutfitStore.getState().assignItemToCollection('item-1', collectionId);

    const updatedState = useOutfitStore.getState();
    const updatedCollection = updatedState.collections.find(c => c.id === collectionId);
    expect(updatedCollection?.itemIds).toContain('item-1');
  });

  it('should not add duplicate items to a collection', () => {
    useOutfitStore.getState().addCollection('My Collection');
    const state = useOutfitStore.getState();
    const collectionId = state.collections[state.collections.length - 1].id;

    useOutfitStore.getState().assignItemToCollection('item-1', collectionId);
    useOutfitStore.getState().assignItemToCollection('item-1', collectionId);

    const updatedState = useOutfitStore.getState();
    const updatedCollection = updatedState.collections.find(c => c.id === collectionId);
    expect(updatedCollection?.itemIds).toEqual(['item-1']); // only one instance
  });

  it('should not affect other collections', async () => {
    useOutfitStore.getState().addCollection('Col 1');
    await new Promise(resolve => setTimeout(resolve, 10)); // ensure different Date.now()
    useOutfitStore.getState().addCollection('Col 2');

    const state = useOutfitStore.getState();
    const col1Id = state.collections[state.collections.length - 2].id;
    const col2Id = state.collections[state.collections.length - 1].id;

    // Sanity check
    expect(col1Id).not.toBe(col2Id);

    useOutfitStore.getState().assignItemToCollection('item-1', col1Id);

    const updatedState = useOutfitStore.getState();
    const col1 = updatedState.collections.find(c => c.id === col1Id);
    const col2 = updatedState.collections.find(c => c.id === col2Id);

    expect(col1?.itemIds).toContain('item-1');
    expect(col2?.itemIds).not.toContain('item-1');
  });

  it('should handle non-existent collection IDs gracefully', () => {
    const initialState = useOutfitStore.getState();

    useOutfitStore.getState().assignItemToCollection('item-1', 'non-existent-id');

    const updatedState = useOutfitStore.getState();
    expect(updatedState.collections).toEqual(initialState.collections);
  });
});
