import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MacroSettingsScreen from '../macro-settings';
import { useOutfitStore } from '../../src/store';

// Mock dependencies
jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../../components/GridBackground', () => ({
  GridBackground: 'GridBackground',
}));

// Mock Zustand store
jest.mock('../../src/store', () => ({
  useOutfitStore: jest.fn(),
}));

describe('MacroSettingsScreen bounds checking', () => {
  let mockSetMacroOrder: jest.Mock;

  beforeEach(() => {
    mockSetMacroOrder = jest.fn();
    (useOutfitStore as unknown as jest.Mock).mockReturnValue({
      macroOrder: ['アウター', 'トップス', 'パンツ'],
      setMacroOrder: mockSetMacroOrder,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call setMacroOrder when moveUp is pressed on the first item', () => {
    const { getByTestId } = render(<MacroSettingsScreen />);

    // moveUp on index 0
    const moveUpButton = getByTestId('move-up-0');
    fireEvent.press(moveUpButton);

    expect(mockSetMacroOrder).not.toHaveBeenCalled();
  });

  it('should not call setMacroOrder when moveDown is pressed on the last item', () => {
    const { getByTestId } = render(<MacroSettingsScreen />);

    // moveDown on index 2 (last item)
    const moveDownButton = getByTestId('move-down-2');
    fireEvent.press(moveDownButton);

    expect(mockSetMacroOrder).not.toHaveBeenCalled();
  });

  it('should call setMacroOrder when moveUp is pressed on a valid item', () => {
    const { getByTestId } = render(<MacroSettingsScreen />);

    // moveUp on index 1
    const moveUpButton = getByTestId('move-up-1');
    fireEvent.press(moveUpButton);

    expect(mockSetMacroOrder).toHaveBeenCalledWith(['トップス', 'アウター', 'パンツ']);
  });

  it('should call setMacroOrder when moveDown is pressed on a valid item', () => {
    const { getByTestId } = render(<MacroSettingsScreen />);

    // moveDown on index 0
    const moveDownButton = getByTestId('move-down-0');
    fireEvent.press(moveDownButton);

    expect(mockSetMacroOrder).toHaveBeenCalledWith(['トップス', 'アウター', 'パンツ']);
  });
});
