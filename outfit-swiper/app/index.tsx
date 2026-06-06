import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, SafeAreaView, Dimensions, TextInput, Alert, Modal } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { Category, ClothingItem } from '../src/types';

const { width } = Dimensions.get('window');

export default function ClosetScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const customCategories = useOutfitStore((state) => state.customCategories);
  const addCustomCategory = useOutfitStore((state) => state.addCustomCategory);

  const [selectedSeason, setSelectedSeason] = useState<string>('すべて');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const SEASONS = ['すべて', '春', '夏', '秋', '冬', '通年', ...customCategories];

  const filteredClothes = clothes.filter(item => {
    if (selectedSeason === 'すべて') return true;
    return item.season === selectedSeason;
  });
  const addMockClothes = useOutfitStore((state) => state.addMockClothes);

  React.useEffect(() => {
    if (clothes.length === 0) {
      addMockClothes();
    }
  }, []);

  const renderItem = ({ item }: { item: ClothingItem }) => {
    let iconName: any = 'shirt';
    if (item.category === 'シューズ') iconName = 'footsteps';
    if (item.category === 'パンツ') iconName = 'man';
    if (item.category === 'アウター') iconName = 'snow';
    if (item.category === 'アクセサリー') iconName = 'glasses';

    return (
      <View style={styles.itemCard}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name={iconName} size={40} color="#666666" />
          </View>
        )}
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {item.tags.slice(0, 2).map((tag, idx) => (
              <View key={idx} style={styles.tagBadge}>
                <Text style={styles.tagText} numberOfLines={1}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>HELLO,</Text>
          <Text style={styles.headerTitle}>OutfitFlow</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DATABASE</Text>
          <Link href="/add-item" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#000000" />
            </TouchableOpacity>
          </Link>
        </View>


        <View style={styles.seasonContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.seasonScroll}>
            {SEASONS.map(season => (
              <TouchableOpacity
                key={season}
                style={[styles.seasonTab, selectedSeason === season && styles.seasonTabActive]}
                onPress={() => setSelectedSeason(season)}
              >
                <Text style={[styles.seasonTabText, selectedSeason === season && styles.seasonTabTextActive]}>{season}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.seasonTab, { backgroundColor: 'transparent', borderStyle: 'dashed' }]}
              onPress={() => setShowAddCategoryModal(true)}
            >
              <Text style={styles.seasonTabText}>+ 追加</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Add Category Modal */}
        <Modal visible={showAddCategoryModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>カテゴリーを追加</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="カテゴリー名"
                placeholderTextColor="#888"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setShowAddCategoryModal(false)}>
                  <Text style={styles.modalButtonText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonAdd}
                  onPress={() => {
                    if (newCategoryName.trim()) {
                      addCustomCategory(newCategoryName.trim());
                      setNewCategoryName('');
                      setShowAddCategoryModal(false);
                    }
                  }}
                >
                  <Text style={styles.modalButtonTextAdd}>追加する</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          data={filteredClothes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="file-tray-outline" size={60} color="#A0A0A0" />
              <Text style={styles.emptyText}>服がありません</Text>
              <Text style={styles.emptySubText}>上の「+」ボタンから追加してください</Text>
            </View>
          }
        />

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 20 },
  greeting: { fontSize: 14, color: '#888888', marginBottom: 4, fontFamily: 'DotGothic', lineHeight: 20 },
  headerTitle: { fontSize: 36, fontFamily: 'ZenDots', color: '#111827', lineHeight: 44, letterSpacing: -1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  seasonContainer: { marginBottom: 16 },
  seasonScroll: { paddingHorizontal: 24, gap: 10 },
  seasonTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
  },
  seasonTabActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0'
  },
  seasonTabText: {
    color: '#666666',
    fontFamily: 'DotGothic',
  },
  seasonTabTextActive: {
    color: '#111827',
  },
  sectionTitle: { fontSize: 18, fontFamily: 'ZenDots', color: '#111827' },
  addButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', zIndex: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 120 }, // 16px container + 8px card margin = 24px outer alignment
  itemCard: {
    width: (width - 64) / 2,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  itemImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  placeholderImage: {
    backgroundColor: '#FAFAFA',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: { fontSize: 14, fontFamily: 'DotGothic', color: '#111827', marginBottom: 4, textAlign: 'center' },
  itemCategory: { fontSize: 12, color: '#888888', fontFamily: 'DotGothic' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: 6 },
  tagBadge: { backgroundColor: 'rgba(17, 24, 39, 0.05)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(17, 24, 39, 0.1)' },
  tagText: { fontSize: 10, fontFamily: 'DotGothic', color: '#111827' },
  emptyContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
  emptyText: { textAlign: 'center', marginTop: 16, fontSize: 18, color: '#111827', fontFamily: 'Orbitron-Bold' },
  emptyIcon: { fontSize: 60 },
  emptySubText: { textAlign: 'center', marginTop: 8, fontSize: 14, color: '#666666', fontFamily: 'DotGothic' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#FAFBFC', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#111827' },
  modalTitle: { fontSize: 18, fontFamily: 'ZenDots', color: '#111827', marginBottom: 16, textAlign: 'center' },
  modalInput: { borderWidth: 1, borderColor: '#111827', borderRadius: 8, padding: 12, fontSize: 16, fontFamily: 'DotGothic', color: '#111827', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButtonCancel: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: '#111827' },
  modalButtonAdd: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#111827' },
  modalButtonText: { fontFamily: 'DotGothic', color: '#111827' },
  modalButtonTextAdd: { fontFamily: 'DotGothic', color: '#FFFFFF' },
  floatingNav: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '85%',
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 32,
    elevation: 10,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  navItem: { padding: 12 },
  mainNavButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: -30,
    elevation: 8,
  },
  mainNavGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
