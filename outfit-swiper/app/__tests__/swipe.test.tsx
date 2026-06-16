import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SwipeScreen from '../swipe';
import { useOutfitStore } from '../../src/store';
import { useRouter } from 'expo-router';
import { PanResponder, Animated } from 'react-native';

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
  }),
}));

const mockSetOutfitItem = jest.fn();

const mockClothes = [
  { id: '1', name: 'Jacket', part: 'アウター' },
  { id: '2', name: 'T-Shirt', part: 'トップス' },
  { id: '3', name: 'Pants', part: 'パンツ' },
];

const mockCollections = [
  { id: 'col-1', name: 'Test Collection', itemIds: ['1', '2', '3'] },
];

const mockMacroOrder = ['アウター', 'トップス', 'パンツ'];

const mockUseOutfitStore = (stateOverrides = {}) => {
  useOutfitStore.mockImplementation((selector) => {
    const state = {
      clothes: mockClothes,
      collections: mockCollections,
      macroOrder: mockMacroOrder,
      currentOutfit: {},
      setOutfitItem: mockSetOutfitItem,
      ...stateOverrides,
    };
    return selector ? selector(state) : state;
  });
};

jest.mock('../../src/store', () => ({
  useOutfitStore: jest.fn(),
}));

jest.mock('../../components/GridBackground', () => {
  const { View } = require('react-native');
  return { GridBackground: () => <View testID="grid-background" /> };
});

describe('SwipeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseOutfitStore();
  });

  it('renders collection modal initially', () => {
    const { getByText } = render(<SwipeScreen />);
    expect(getByText('SELECT COLLECTION')).toBeTruthy();
    expect(getByText('ALL CLOTHES')).toBeTruthy();
    expect(getByText('Test Collection')).toBeTruthy();
  });

  it('can back out of collection modal', () => {
    const { getByText } = render(<SwipeScreen />);
    fireEvent.press(getByText('BACK'));
    expect(mockBack).toHaveBeenCalled();
  });

  it('loads items after selecting ALL CLOTHES', async () => {
    const { getByText, queryByText } = render(<SwipeScreen />);

    // Select collection
    fireEvent.press(getByText('ALL CLOTHES'));

    // Modal should disappear, header should appear
    await waitFor(() => {
      expect(queryByText('SELECT COLLECTION')).toBeNull();
    });

    expect(getByText('STEP 1 / 3')).toBeTruthy();
    expect(getByText('アウター')).toBeTruthy();
    expect(getByText('Jacket')).toBeTruthy();
  });

  it('loads items after selecting specific collection', async () => {
    const { getByText, queryByText } = render(<SwipeScreen />);

    // Select collection
    fireEvent.press(getByText('Test Collection'));

    await waitFor(() => {
      expect(queryByText('SELECT COLLECTION')).toBeNull();
    });

    expect(getByText('STEP 1 / 3')).toBeTruthy();
    expect(getByText('アウター')).toBeTruthy();
    expect(getByText('Jacket')).toBeTruthy();
  });

  it('navigates to final-confirmation when out of macro order parts', async () => {
    // Override the store state to make it start at the end
    mockUseOutfitStore({ macroOrder: [] });

    const { getByText } = render(<SwipeScreen />);
    fireEvent.press(getByText('ALL CLOTHES'));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/final-confirmation');
    });
  });

  it('skips item if out of items for a part', async () => {
    // Empty clothes
    mockUseOutfitStore({ clothes: [] });

    const { getByText, queryByText } = render(<SwipeScreen />);
    fireEvent.press(getByText('ALL CLOTHES'));

    await waitFor(() => {
      expect(getByText('OUT OF ITEMS')).toBeTruthy();
    });

    // Skip to next macro part
    fireEvent.press(getByText('SKIP'));

    await waitFor(() => {
      expect(getByText('STEP 2 / 3')).toBeTruthy();
      expect(getByText('トップス')).toBeTruthy();
    });
  });

  // Since we cannot easily trigger swipe gestures in Animated View through fireEvent,
  // we'll mock forceSwipe by testing the exported pan handler or internal logic if possible,
  // but it's simpler to verify SKIP and UI elements here, or we can mock Animated.timing
  // and manually call it. Since component functions are internal, let's see if we can trigger pan responders.
});
