import { useOutfitStore } from '../index';

describe('useOutfitStore - assignItemToCollection', () => {
  beforeEach(() => {
    // Clear the store before each test
    useOutfitStore.getState().clearAll();
  });

  it('should assign an item to a collection if it is not already in the collection', () => {
    // Setup initial state
    useOutfitStore.getState().addCollection('Test Collection');
    const state = useOutfitStore.getState();
    const newCollection = state.collections.find(c => c.name === 'Test Collection');

    expect(newCollection).toBeDefined();
    if (!newCollection) return;

    // Action
    useOutfitStore.getState().assignItemToCollection('item-1', newCollection.id);

    // Assert
    const updatedCollection = useOutfitStore.getState().collections.find(c => c.id === newCollection.id);
    expect(updatedCollection?.itemIds).toContain('item-1');
    expect(updatedCollection?.itemIds.length).toBe(1);
  });

  it('should not duplicate the item if it is already in the collection', () => {
    // Setup initial state
    useOutfitStore.getState().addCollection('Test Collection');
    const state = useOutfitStore.getState();
    const newCollection = state.collections.find(c => c.name === 'Test Collection');

    expect(newCollection).toBeDefined();
    if (!newCollection) return;

    // Action: Add it twice
    useOutfitStore.getState().assignItemToCollection('item-1', newCollection.id);
    useOutfitStore.getState().assignItemToCollection('item-1', newCollection.id);

    // Assert
    const updatedCollection = useOutfitStore.getState().collections.find(c => c.id === newCollection.id);
    expect(updatedCollection?.itemIds).toContain('item-1');
    expect(updatedCollection?.itemIds.length).toBe(1); // Should still be 1
  });

  it('should not modify anything if the collectionId does not exist', () => {
    // Setup initial state
    const initialState = useOutfitStore.getState().collections;

    // Action
    useOutfitStore.getState().assignItemToCollection('item-1', 'non-existent-col-id');

    // Assert
    const afterState = useOutfitStore.getState().collections;
    expect(afterState).toEqual(initialState);
  });
});
