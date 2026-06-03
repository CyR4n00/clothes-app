import { Ionicons } from '@expo/vector-icons';
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

    let iconName: any = 'shirt';
    if (category === 'シューズ') iconName = 'footsteps';
    if (category === 'パンツ') iconName = 'man';
    if (category === 'アウター') iconName = 'snow';
    if (category === 'アクセサリー') iconName = 'glasses';

    return (
      <View key={category} style={styles.mannequinRow}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.mannequinImage} />
        ) : (
          <View style={styles.mannequinPlaceholder}>
            <Ionicons name={iconName} size={32} color="#666666" />
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
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 30,
    padding: 20,




    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 20, color: '#111827' },
  outfitContainer: { marginBottom: 30, alignItems: 'center' },

  categoryLabel: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 5 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',




    elevation: 2,
  },
  mannequinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',




    elevation: 2,
    marginBottom: 10,
  },
  mannequinImage: { width: 80, height: 80, borderRadius: 20, marginRight: 15 },
  mannequinPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mannequinInfo: { flex: 1 },

  itemName: { fontSize: 18, fontWeight: '800', color: '#111827' },
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
  adText: { color: '#999999', fontWeight: '800' },
  finishButton: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  finishButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
});
