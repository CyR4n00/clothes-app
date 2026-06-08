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
            <Ionicons name="arrow-back" size={24} color="#39FF14" />
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
                <Ionicons name="camera-outline" size={40} color="#39FF14" />
                <Text style={styles.imagePlaceholderText}>UPLOAD PHOTO</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ITEM NAME <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="例: 黒のダウンジャケット"
              placeholderTextColor="#666"
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
              placeholderTextColor="#666"
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
  container: { flex: 1, backgroundColor: '#050505' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, backgroundColor: 'rgba(57, 255, 20, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#39FF14' },
  headerTitle: { fontSize: 20, fontFamily: 'Orbitron-Bold', color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  formContainer: { padding: 20 },
  imagePicker: { width: '100%', height: 250, backgroundColor: '#111', borderRadius: 20, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#333', borderStyle: 'dashed' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { color: '#39FF14', marginTop: 10, fontFamily: 'Orbitron-Bold' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontFamily: 'Orbitron-Bold', color: '#FFF', marginBottom: 8 },
  required: { color: '#FF00FF' },
  input: { backgroundColor: '#111', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#333', color: '#FFF', fontFamily: 'DotGothic16-Regular' },
  partsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  partChip: { backgroundColor: '#111', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  partChipSelected: { backgroundColor: 'rgba(57, 255, 20, 0.2)', borderColor: '#39FF14' },
  partChipText: { color: '#888', fontFamily: 'Orbitron-Bold' },
  partChipTextSelected: { color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5 },
  saveButton: { backgroundColor: '#39FF14', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 10, marginBottom: 40, shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  saveButtonText: { color: '#050505', fontSize: 18, fontFamily: 'Orbitron-Bold' }
});
