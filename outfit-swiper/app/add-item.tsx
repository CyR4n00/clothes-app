import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActionSheetIOS, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useOutfitStore } from '../src/store';
import { Category } from '../src/types';

const CATEGORIES: Category[] = ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'];

export default function AddItemScreen() {
  const router = useRouter();
  const addClothingItem = useOutfitStore((state) => state.addClothingItem);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('トップス');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('権限が必要です', 'カメラロールへのアクセスを許可してください。');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleImageOption = () => {
    if (Platform.OS === 'web') {
      const choice = window.confirm("OKでライブラリから選択、キャンセルで写真を撮影します");
      if (choice) {
        pickImage();
      } else {
        takePhoto();
      }
    } else if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['キャンセル', '写真を撮る', 'ライブラリから選ぶ'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            pickImage();
          }
        }
      );
    } else {
      // Android fallback
      Alert.alert('画像を選択', '', [
        { text: '写真を撮る', onPress: takePhoto },
        { text: 'ライブラリから選ぶ', onPress: pickImage },
        { text: 'キャンセル', style: 'cancel' }
      ]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('権限が必要です', 'カメラへのアクセスを許可してください。');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name) {
      Alert.alert('エラー', '服の名前を入力してください。');
      return;
    }

    addClothingItem({
      name,
      category,
      imageUrl: imageUri || undefined,
      season: 'all',
      style: 'casual',
    });

    Alert.alert('成功', '服を追加しました！', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageSection}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>画像がありません</Text>
          </View>
        )}
        <TouchableOpacity style={styles.imageButton} onPress={handleImageOption}>
          <Text style={styles.imageButtonText}>画像を選択する</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>名前</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="例: 白いTシャツ"
        />

        <Text style={styles.label}>カテゴリー</Text>
        <View style={styles.categoryContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>登録する</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageSection: { alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  imagePreview: { width: 200, height: 200, borderRadius: 10 },
  imagePlaceholder: { width: 200, height: 200, borderRadius: 10, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { color: '#888' },
  imageButtons: { flexDirection: 'row', marginTop: 15, gap: 10 },
  imageButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  imageButtonText: { color: '#fff', fontWeight: 'bold' },
  formSection: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  categoryButton: { borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15 },
  categoryButtonActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  categoryText: { color: '#333' },
  categoryTextActive: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
