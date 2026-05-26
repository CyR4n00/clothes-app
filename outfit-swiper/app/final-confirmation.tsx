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

  const renderOutfitItem = (category: Category) => {
    const item = currentOutfit[category];
    if (!item) return null;

    let emoji = '👕';
    if (category === 'シューズ') emoji = '👟';
    if (category === 'パンツ') emoji = '👖';
    if (category === 'アウター') emoji = '🧥';
    if (category === 'アクセサリー') emoji = '🧢';

    return (
      <View key={category} style={styles.outfitRow}>
        <Text style={styles.categoryLabel}>{category}</Text>
        <View style={styles.itemCard}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={{fontSize: 24}}>{emoji}</Text>
            </View>
          )}
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#E5D9F2', '#F5EFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollArea}>
          <View style={styles.glassCard}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#4C1D95' },
  outfitContainer: { marginBottom: 30 },
  outfitRow: { marginBottom: 15 },
  categoryLabel: { fontSize: 16, fontWeight: 'bold', color: '#8B5CF6', marginBottom: 5 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  itemImage: { width: 60, height: 60, borderRadius: 12, marginRight: 15 },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#4C1D95' },
  adContainer: {
    backgroundColor: '#F5F3FF',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    borderStyle: 'dashed'
  },
  adText: { color: '#A78BFA', fontWeight: 'bold' },
  finishButton: {
    backgroundColor: '#A78BFA',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
