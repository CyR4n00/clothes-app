import { useOutfitStore } from '../index';

describe('useOutfitStore', () => {
  beforeEach(() => {
    useOutfitStore.getState().clearAll();
    jest.restoreAllMocks(); // Ensure clean state for mocks
  });

  describe('addClothingItem', () => {
    it('adds a new item to the empty clothes array', () => {
      const newItem = { name: '白Tシャツ', part: 'トップス' as const };

      useOutfitStore.getState().addClothingItem(newItem);

      const { clothes } = useOutfitStore.getState();
      expect(clothes.length).toBe(1);
      expect(clothes[0].name).toBe('白Tシャツ');
      expect(clothes[0].part).toBe('トップス');
      expect(clothes[0].id).toBeDefined();
    });

    it('appends a new item to an existing clothes array', () => {
      // Mock Date.now to return different values to avoid identical IDs if executing fast
      let counter = 0;
      jest.spyOn(Date, 'now').mockImplementation(() => 1600000000000 + counter++);

      const firstItem = { name: '白Tシャツ', part: 'トップス' as const };
      const secondItem = { name: '黒スラックス', part: 'パンツ' as const };

      useOutfitStore.getState().addClothingItem(firstItem);
      useOutfitStore.getState().addClothingItem(secondItem);

      const { clothes } = useOutfitStore.getState();
      expect(clothes.length).toBe(2);
      expect(clothes[0].name).toBe('白Tシャツ');
      expect(clothes[1].name).toBe('黒スラックス');
      expect(clothes[0].id).not.toBe(clothes[1].id);
    });

    it('generates a unique id based on Date.now()', () => {
      // Mock Date.now to return predictable values
      const dateNowSpy = jest.spyOn(Date, 'now')
                             .mockReturnValueOnce(1700000000000)
                             .mockReturnValueOnce(1700000000001);

      const firstItem = { name: 'アウター1', part: 'アウター' as const };
      const secondItem = { name: 'アウター2', part: 'アウター' as const };

      useOutfitStore.getState().addClothingItem(firstItem);
      useOutfitStore.getState().addClothingItem(secondItem);

      const { clothes } = useOutfitStore.getState();
      expect(clothes[0].id).toBe('1700000000000');
      expect(clothes[1].id).toBe('1700000000001');
    });
  });
});
