import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { Category } from '../src/types';

export default function FinalConfirmationScreen() {
  const router = useRouter();
  const currentOutfit = useOutfitStore((state) => state.currentOutfit);
  const resetOutfit = useOutfitStore((state) => state.resetOutfit);

  const handleFinish = () => {
    resetOutfit();
    router.replace('/');
  };

  const renderOutfitItem = (category: Category) => {
    const item = currentOutfit[category];
    if (!item) return null;

    return (
      <View key={category} style={styles.outfitRow}>
        <Text style={styles.categoryLabel}>{category}</Text>
        <View style={styles.itemCard}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={{fontSize: 10, color: '#666'}}>画像なし</Text>
            </View>
          )}
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>今日のセットアップ</Text>

      <View style={styles.outfitContainer}>
        {Object.keys(currentOutfit).map((cat) => renderOutfitItem(cat as Category))}
      </View>

      {/* Mock AdSense Banner */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>[広告] スポンサーリンク</Text>
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>これで決定！ (ホームへ戻る)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  outfitContainer: { marginBottom: 30 },
  outfitRow: { marginBottom: 15 },
  categoryLabel: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 5 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemImage: { width: 50, height: 50, borderRadius: 5, marginRight: 15 },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemName: { fontSize: 16, fontWeight: '500' },
  adContainer: {
    backgroundColor: '#eaeaea',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 5,
  },
  adText: { color: '#888' },
  finishButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
