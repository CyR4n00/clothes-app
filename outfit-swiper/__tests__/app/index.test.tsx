import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import HomeScreen from '../../app/index';
import { useOutfitStore } from '../../src/store';
import { useRouter } from 'expo-router';

// Mock the store
jest.mock('../../src/store', () => ({
  useOutfitStore: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default store implementation for tests
    (useOutfitStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        clothes: [],
        collections: [
          { id: 'col-1', name: '春', itemIds: [] },
          { id: 'col-2', name: '夏', itemIds: [] },
        ],
        addCollection: jest.fn(),
        assignItemToCollection: jest.fn(),
        removeItemFromCollection: jest.fn(),
        addMockData: jest.fn(),
      };
      return selector(state);
    });
  });

  it('renders correctly with default state', () => {
    render(<HomeScreen />);

    // Check header
    expect(screen.getByText('OUTFIT SWIPER')).toBeTruthy();

    // Check Swipe Hero button
    expect(screen.getByText('SWIPE TO DECIDE')).toBeTruthy();
    expect(screen.getByText('今日のセットアップを決める')).toBeTruthy();

    // Check Tabs
    expect(screen.getByText('ALL')).toBeTruthy();
    expect(screen.getByText('春')).toBeTruthy();
    expect(screen.getByText('夏')).toBeTruthy();

    // Check "NEW ITEM" button is visible in 'ALL' tab
    expect(screen.getByText('+ NEW ITEM')).toBeTruthy();
  });

  it('navigates to swipe screen when "SWIPE TO DECIDE" is pressed', () => {
    render(<HomeScreen />);
    const swipeButton = screen.getByText('SWIPE TO DECIDE');
    fireEvent.press(swipeButton);

    expect(mockPush).toHaveBeenCalledWith('/swipe');
  });

  it('navigates to add item screen when "+ NEW ITEM" is pressed', () => {
    render(<HomeScreen />);
    const addItemButton = screen.getByText('+ NEW ITEM');
    fireEvent.press(addItemButton);

    expect(mockPush).toHaveBeenCalledWith('/add-item');
  });

  it('navigates to macro settings when options icon is pressed', () => {
    // The options icon button is the first TouchableOpacity in headerRight
    // We can find it by testID if we had one, but we can also use testID of mock Ionicons
    render(<HomeScreen />);

    // Find the touchable wrapping the options-outline icon
    const optionsButton = screen.getByTestId('icon-options-outline').parent;
    fireEvent.press(optionsButton);

    expect(mockPush).toHaveBeenCalledWith('/macro-settings');
  });

  it('opens new category modal when add tab button is pressed', () => {
    render(<HomeScreen />);

    // Modal should be initially hidden (text NEW CATEGORY might not be queryable if modal visible=false hides it)
    // Actually React Native Modal renders its children, but testing-library can query it.
    // We'll check if we can type into it.

    const addTabBtn = screen.getByTestId('icon-add').parent;
    fireEvent.press(addTabBtn);

    const input = screen.getByPlaceholderText('例: デート用, 宴会用');
    expect(input).toBeTruthy();
  });

  it('creates a new collection', () => {
    const mockAddCollection = jest.fn();
    (useOutfitStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        clothes: [],
        collections: [],
        addCollection: mockAddCollection,
        assignItemToCollection: jest.fn(),
        removeItemFromCollection: jest.fn(),
        addMockData: jest.fn(),
      };
      return selector(state);
    });

    render(<HomeScreen />);

    // Open modal
    const addTabBtn = screen.getByTestId('icon-add').parent;
    fireEvent.press(addTabBtn);

    // Enter category name
    const input = screen.getByPlaceholderText('例: デート用, 宴会用');
    fireEvent.changeText(input, 'Winter Trip');

    // Press CREATE
    const createButton = screen.getByText('CREATE');
    fireEvent.press(createButton);

    expect(mockAddCollection).toHaveBeenCalledWith('Winter Trip');
  });

  it('displays clothing items', () => {
    (useOutfitStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        clothes: [
          { id: '1', name: 'Black Jacket', part: 'アウター', tags: ['winter'] },
          { id: '2', name: 'White T-Shirt', part: 'トップス', tags: ['summer'] },
        ],
        collections: [{ id: 'col-1', name: '春', itemIds: [] }],
        addCollection: jest.fn(),
        assignItemToCollection: jest.fn(),
        removeItemFromCollection: jest.fn(),
        addMockData: jest.fn(),
      };
      return selector(state);
    });

    render(<HomeScreen />);

    expect(screen.getByText('Black Jacket')).toBeTruthy();
    expect(screen.getByText('アウター')).toBeTruthy();
    expect(screen.getByText('#winter')).toBeTruthy();

    expect(screen.getByText('White T-Shirt')).toBeTruthy();
    expect(screen.getByText('トップス')).toBeTruthy();
    expect(screen.getByText('#summer')).toBeTruthy();
  });
});
