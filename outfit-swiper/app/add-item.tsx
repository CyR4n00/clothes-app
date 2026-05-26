import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActionSheetIOS, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
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
      if (Platform.OS === 'web') {
        window.alert('エラー: 服の名前を入力してください。');
      } else {
        Alert.alert('エラー', '服の名前を入力してください。');
      }
      return;
    }

    addClothingItem({
      name,
      category,
      imageUrl: imageUri || undefined,
      season: 'all',
      style: 'casual',
    });

    if (Platform.OS === 'web') {
      console.log('成功: 服を追加しました！');
      router.back();
    } else {
      Alert.alert('成功', '服を追加しました！', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  return (
    <LinearGradient colors={['#E5D9F2', '#F5EFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.glassCard}>
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
                placeholderTextColor="#A78BFA"
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

              <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>戻る</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glassCard: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  imageSection: { alignItems: 'center', marginBottom: 20 },
  imagePreview: { width: 200, height: 200, borderRadius: 20 },
  imagePlaceholder: { width: 200, height: 200, borderRadius: 20, backgroundColor: '#F5F3FF', justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { color: '#A78BFA' },
  imageButton: { backgroundColor: '#8B5CF6', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, marginTop: 15 },
  imageButtonText: { color: '#fff', fontWeight: 'bold' },
  formSection: { },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 15, color: '#4C1D95' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#EDE9FE', borderRadius: 12, padding: 15, fontSize: 16, color: '#4C1D95' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  categoryButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#EDE9FE', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 15 },
  categoryButtonActive: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  categoryText: { color: '#6D28D9' },
  categoryTextActive: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#A78BFA', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#8B5CF6', fontSize: 16, fontWeight: 'bold' },
});
