import { useOutfitStore } from '../index';

describe('useOutfitStore', () => {
  beforeEach(() => {
    useOutfitStore.getState().clearAll();
  });

  it('removes non-default collections but keeps default ones', () => {
    // Initial state has default collections
    const initialState = useOutfitStore.getState();
    const defaultCollection = initialState.collections.find(c => c.isDefault);
    expect(defaultCollection).toBeDefined();

    // Try to remove a default collection
    if (defaultCollection) {
      useOutfitStore.getState().removeCollection(defaultCollection.id);
    }

    // It should still be there
    expect(useOutfitStore.getState().collections.find(c => c.id === defaultCollection?.id)).toBeDefined();

    // Add a custom collection
    useOutfitStore.getState().addCollection('Custom Collection');
    const customCollection = useOutfitStore.getState().collections.find(c => !c.isDefault);
    expect(customCollection).toBeDefined();

    // Remove the custom collection
    if (customCollection) {
      useOutfitStore.getState().removeCollection(customCollection.id);
    }

    // It should be gone
    expect(useOutfitStore.getState().collections.find(c => c.id === customCollection?.id)).toBeUndefined();
  });
});
