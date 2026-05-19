import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOutfitStore } from '../src/store';
import { Category, ClothingItem } from '../src/types';

export default function ClosetScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const addMockClothes = useOutfitStore((state) => state.addMockClothes);

  React.useEffect(() => {
    if (clothes.length === 0) {
      addMockClothes();
    }
  }, []);

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <View style={styles.itemCard}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="shirt-outline" size={40} color="#888" />
          <Text style={styles.placeholderText}>画像なし</Text>
        </View>
      )}
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.categoryBadge}>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clothes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>まだクローゼットに服がありません。</Text>
            <Text style={styles.emptySubText}>下の「＋ 追加」ボタンから登録してください！</Text>
          </View>
        }
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/add-item')}>
          <Ionicons name="add-circle" size={28} color="#FF2D55" />
          <Text style={styles.iconButtonText}>追加</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/swipe')}>
          <Ionicons name="sparkles" size={24} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.primaryButtonText}>今日着る服を選ぶ！</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/macro-settings')}>
          <Ionicons name="settings" size={28} color="#666" />
          <Text style={styles.iconButtonText}>設定</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  listContainer: { padding: 10, paddingBottom: 100 },
  itemCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: { width: '100%', aspectRatio: 1, borderRadius: 12, marginBottom: 10 },
  placeholderImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: { color: '#888', fontSize: 12, marginTop: 4 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#343A40', marginBottom: 4, textAlign: 'center' },
  categoryBadge: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemCategory: { fontSize: 10, color: '#495057', fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 100, padding: 20 },
  emptyText: { textAlign: 'center', marginTop: 15, fontSize: 16, color: '#495057', fontWeight: 'bold' },
  emptySubText: { textAlign: 'center', marginTop: 8, fontSize: 14, color: '#868E96' },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  iconButtonText: { fontSize: 10, color: '#495057', marginTop: 2, fontWeight: '600' },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#FF2D55',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 15,
  },
  primaryButtonText: { fontWeight: 'bold', color: '#fff', fontSize: 16 },
});
