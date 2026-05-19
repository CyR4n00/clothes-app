import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useStore } from '../store';
import { Category, Season, Style } from '../types';

export const AddItemScreen = ({ navigation }: any) => {
  const { addClothingItem } = useStore();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Tops');
  const [season, setSeason] = useState<Season[]>(['All']);
  const [style, setStyle] = useState<Style>('Casual');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !imageUri) {
      Alert.alert('Error', 'Please provide a name and an image.');
      return;
    }
    addClothingItem({
      id: Date.now().toString(),
      name,
      category,
      season,
      style,
      imageUrl: imageUri,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Item</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Tap to select image</Text>
          )}
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., White T-Shirt"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.chipContainer}>
            {['Outerwear', 'Tops', 'Bottoms', 'Shoes', 'Accessories'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, category === cat && styles.chipActive]}
                onPress={() => setCategory(cat as Category)}
              >
                <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Style</Text>
          <View style={styles.chipContainer}>
            {['Casual', 'Formal', 'Sporty', 'Lounge'].map((sty) => (
              <TouchableOpacity
                key={sty}
                style={[styles.chip, style === sty && styles.chipActive]}
                onPress={() => setStyle(sty as Style)}
              >
                <Text style={[styles.chipText, style === sty && styles.chipTextActive]}>{sty}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 16, color: '#007AFF' },
  saveButton: { padding: 8 },
  saveButtonText: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
  content: { padding: 16 },
  imageContainer: { width: '100%', height: 300, backgroundColor: '#e5e5ea', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 24, overflow: 'hidden' },
  imagePlaceholder: { color: '#666', fontSize: 16 },
  image: { width: '100%', height: '100%' },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e5e5ea' },
  chipActive: { backgroundColor: '#007AFF' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '600' }
});