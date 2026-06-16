import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import AddItemScreen from '../../app/add-item';
import { useOutfitStore } from '../../src/store';

describe('AddItemScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOutfitStore.setState({ clothes: [] });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddItemScreen />);

    expect(getByText('ADD ITEM')).toBeTruthy();
    expect(getByText('UPLOAD PHOTO')).toBeTruthy();
    expect(getByPlaceholderText('例: 黒のダウンジャケット')).toBeTruthy();
    expect(getByText('アウター')).toBeTruthy();
  });

  it('validates missing name', () => {
    const { getByText } = render(<AddItemScreen />);
    const saveButton = getByText('REGISTER');

    fireEvent.press(saveButton);

    expect(global.alert).toHaveBeenCalledWith('服の名前を入力してください');
  });

  it('validates missing part', () => {
    const { getByText, getByPlaceholderText } = render(<AddItemScreen />);

    const nameInput = getByPlaceholderText('例: 黒のダウンジャケット');
    fireEvent.changeText(nameInput, 'テストジャケット');

    const saveButton = getByText('REGISTER');
    fireEvent.press(saveButton);

    expect(global.alert).toHaveBeenCalledWith('服の部位を選択してください');
  });

  it('saves item successfully and navigates back', async () => {
    const { getByText, getByPlaceholderText } = render(<AddItemScreen />);
    const router = useRouter();

    // Fill form
    const nameInput = getByPlaceholderText('例: 黒のダウンジャケット');
    fireEvent.changeText(nameInput, 'テストジャケット');

    const tagsInput = getByPlaceholderText('例: 防寒, お気に入り');
    fireEvent.changeText(tagsInput, '冬, 暖かい');

    // Select part
    const partButton = getByText('アウター');
    fireEvent.press(partButton);

    // Save
    const saveButton = getByText('REGISTER');
    fireEvent.press(saveButton);

    // Check store
    const clothes = useOutfitStore.getState().clothes;
    expect(clothes.length).toBe(1);
    expect(clothes[0].name).toBe('テストジャケット');
    expect(clothes[0].part).toBe('アウター');
    expect(clothes[0].tags).toEqual(['冬', '暖かい']);

    // Check navigation
    expect(router.back).toHaveBeenCalled();
  });

  it('handles image picker (base64)', async () => {
    const mockLaunchImageLibraryAsync = ImagePicker.launchImageLibraryAsync as jest.Mock;
    mockLaunchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ base64: 'mockbase64data' }]
    });

    const { getByText, getByPlaceholderText, getByTestId, queryByText } = render(<AddItemScreen />);

    // Open picker
    const uploadButton = getByText('UPLOAD PHOTO');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(mockLaunchImageLibraryAsync).toHaveBeenCalled();
      expect(queryByText('UPLOAD PHOTO')).toBeNull(); // Placeholder should disappear
    });

    // Fill the rest and save
    fireEvent.changeText(getByPlaceholderText('例: 黒のダウンジャケット'), '画像付きテスト');
    fireEvent.press(getByText('アウター'));
    fireEvent.press(getByText('REGISTER'));

    const clothes = useOutfitStore.getState().clothes;
    expect(clothes[0].imageUrl).toBe('data:image/jpeg;base64,mockbase64data');
  });

  it('handles image picker (uri fallback)', async () => {
    const mockLaunchImageLibraryAsync = ImagePicker.launchImageLibraryAsync as jest.Mock;
    mockLaunchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: 'file://mock/path.jpg' }] // No base64
    });

    const { getByText, getByPlaceholderText, queryByText } = render(<AddItemScreen />);

    // Open picker
    const uploadButton = getByText('UPLOAD PHOTO');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(mockLaunchImageLibraryAsync).toHaveBeenCalled();
      expect(queryByText('UPLOAD PHOTO')).toBeNull();
    });

    // Fill the rest and save
    fireEvent.changeText(getByPlaceholderText('例: 黒のダウンジャケット'), '画像付きテスト2');
    fireEvent.press(getByText('トップス'));
    fireEvent.press(getByText('REGISTER'));

    const clothes = useOutfitStore.getState().clothes;
    expect(clothes[0].imageUrl).toBe('file://mock/path.jpg');
  });

  it('handles cancelled image picker', async () => {
    const mockLaunchImageLibraryAsync = ImagePicker.launchImageLibraryAsync as jest.Mock;
    mockLaunchImageLibraryAsync.mockResolvedValueOnce({
      canceled: true
    });

    const { getByText } = render(<AddItemScreen />);

    const uploadButton = getByText('UPLOAD PHOTO');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(mockLaunchImageLibraryAsync).toHaveBeenCalled();
      // Placeholder should still be there
      expect(getByText('UPLOAD PHOTO')).toBeTruthy();
    });
  });
  it('navigates back when back button is pressed', () => {
    const { getByTestId } = render(<AddItemScreen />);
    const router = useRouter();

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(router.back).toHaveBeenCalled();
  });
});
