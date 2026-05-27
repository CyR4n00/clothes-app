import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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


  const DISPLAY_ORDER: Category[] = ['アクセサリー', 'アウター', 'トップス', 'パンツ', 'シューズ'];

  const renderOutfitItem = (category: Category) => {
    const item = currentOutfit[category];
    if (!item) return null;

    let emoji = '👕';
    if (category === 'シューズ') emoji = '👟';
    if (category === 'パンツ') emoji = '👖';
    if (category === 'アウター') emoji = '🧥';
    if (category === 'アクセサリー') emoji = '🧢';

    return (
      <View key={category} style={styles.mannequinRow}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.mannequinImage} />
        ) : (
          <View style={styles.mannequinPlaceholder}>
            <Text style={{fontSize: 32}}>{emoji}</Text>
          </View>
        )}
        <View style={styles.mannequinInfo}>
          <Text style={styles.categoryLabel}>{category}</Text>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        </View>
      </View>
    );
  };


  return (
    <LinearGradient colors={['#F8F9FA', '#FFFFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollArea}>
          <View style={styles.glassCard}>
            <Text style={styles.title}>今日のセットアップ</Text>

            <View style={styles.outfitContainer}>
              {DISPLAY_ORDER.map((cat) => renderOutfitItem(cat))}
            </View>

            {}
            <View style={styles.adContainer}>
              <Text style={styles.adText}>[広告] スポンサーリンク</Text>
            </View>

            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>これで決定！ (ホームへ戻る)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollArea: { padding: 20 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1A1A1A' },
  outfitContainer: { marginBottom: 30, alignItems: 'center' },

  categoryLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  mannequinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  mannequinImage: { width: 80, height: 80, borderRadius: 16, marginRight: 15 },
  mannequinPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mannequinInfo: { flex: 1 },

  itemName: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  adContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    borderStyle: 'dashed'
  },
  adText: { color: '#999999', fontWeight: 'bold' },
  finishButton: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
