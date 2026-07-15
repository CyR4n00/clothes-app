import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOutfitStore } from '../src/store';
import { Part } from '../src/types';
import { GridBackground } from '../components/GridBackground';

const { width } = Dimensions.get('window');

// 類似の服のモックデータ
const dummySimilarClothes = [
  { id: 'sim1', name: 'オーバーサイズデニムJKT', part: 'アウター' as Part, user: 'StreetWearFan', tags: ['春', 'ストリート'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Denim+Jacket' },
  { id: 'sim2', name: 'ワイド黒スラックス', part: 'パンツ' as Part, user: 'MinimalistGuru', tags: ['モード', '着回し'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Black+Slacks' },
  { id: 'sim3', name: 'ロゴ白Tシャツ', part: 'トップス' as Part, user: 'CasualBoy', tags: ['夏', 'カジュアル'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=White+Tee' },
  { id: 'sim4', name: 'レザーローファー', part: 'シューズ' as Part, user: 'CityBoy', tags: ['フォーマル', 'デート'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Loafers' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const addClothingItem = useOutfitStore(state => state.addClothingItem);

  const handleAddToCloset = (item: any) => {
    addClothingItem({
      name: item.name,
      part: item.part,
      imageUrl: item.imageUrl,
      tags: item.tags
    });
    Alert.alert('通知', `${item.name}をクローゼットに追加しました！`);
  };

  const renderOutfit = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.overlay}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.username}>found by @{item.user}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCloset(item)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>ADD TO CLOSET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag: string) => (
          <View key={tag} style={styles.tagBadge}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>EXPLORE</Text>
        </View>

        <FlatList
          data={dummySimilarClothes}
          keyExtractor={item => item.id}
          renderItem={renderOutfit}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20 },
  title: { fontSize: 24, fontWeight: '900', color: '#111827' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100, gap: 20 },

  card: {
    width: '100%',
    height: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#111827'
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 2,
    borderBottomColor: '#111827'
  },
  username: { color: '#111827', fontWeight: '900', fontSize: 14 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  likes: { color: '#111827', fontWeight: '900', fontSize: 14 },

  tagsContainer: {
    position: 'absolute',
    bottom: 15, left: 15,
    flexDirection: 'row', gap: 8
  },
  tagBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 8, borderWidth: 2, borderColor: '#111827'
  },
  tagText: { color: '#111827', fontWeight: '800', fontSize: 12 },

  paywallOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paywallText: { color: '#111827', fontWeight: '900', fontSize: 18, marginBottom: 20, letterSpacing: 2 },
  unlockButton: { backgroundColor: '#111827', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15 },
  unlockButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },

  itemName: { color: '#111827', fontWeight: '900', fontSize: 18, marginBottom: 4 },
  addButton: { backgroundColor: '#111827', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12, gap: 5 },
  addButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 12 }
});
