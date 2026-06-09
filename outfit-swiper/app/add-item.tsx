import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useOutfitStore } from '../src/store';
import { Part } from '../src/types';
import { GridBackground } from '../components/GridBackground';

const PARTS: Part[] = ['アウター', 'トップス', 'パンツ', 'シューズ', 'アクセサリー'];

export default function AddItemScreen() {
  const router = useRouter();
  const addClothingItem = useOutfitStore((state) => state.addClothingItem);

  const [name, setName] = useState('');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (result.assets[0].base64) {
        setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } else {
        setImageUri(result.assets[0].uri);
      }
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('服の名前を入力してください');
      return;
    }
    if (!selectedPart) {
      alert('服の部位を選択してください');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

    addClothingItem({
      name,
      part: selectedPart,
      imageUrl: imageUri || undefined,
      tags
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ADD ITEM</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.formContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="camera-outline" size={40} color="#111827" />
                <Text style={styles.imagePlaceholderText}>UPLOAD PHOTO</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ITEM NAME <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="例: 黒のダウンジャケット"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PART <Text style={styles.required}>*</Text></Text>
            <View style={styles.partsContainer}>
              {PARTS.map(part => (
                <TouchableOpacity
                  key={part}
                  style={[styles.partChip, selectedPart === part && styles.partChipSelected]}
                  onPress={() => setSelectedPart(part)}
                >
                  <Text style={[styles.partChipText, selectedPart === part && styles.partChipTextSelected]}>
                    {part}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>TAGS (comma separated)</Text>
            <TextInput
              style={styles.input}
              placeholder="例: 防寒, お気に入り"
              placeholderTextColor="#9CA3AF"
              value={tagsInput}
              onChangeText={setTagsInput}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 2, borderColor: '#111827' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#111827' },
  formContainer: { padding: 20 },
  imagePicker: { width: '100%', height: 250, backgroundColor: '#F9FAFB', borderRadius: 16, marginBottom: 20, overflow: 'hidden', borderWidth: 2, borderColor: '#111827', borderStyle: 'dashed' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { color: '#111827', marginTop: 10, fontWeight: '800' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '900', color: '#111827', marginBottom: 8 },
  required: { color: '#EF4444' },
  input: { backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 2, borderColor: '#E5E7EB', color: '#111827', fontWeight: '700' },
  partsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  partChip: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 2, borderColor: '#E5E7EB' },
  partChipSelected: { backgroundColor: '#111827', borderColor: '#111827' },
  partChipText: { color: '#6B7280', fontWeight: '800' },
  partChipTextSelected: { color: '#FFFFFF' },
  saveButton: { backgroundColor: '#111827', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  saveButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' }
});
