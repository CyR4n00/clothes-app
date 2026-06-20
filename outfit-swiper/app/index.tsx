import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { GridBackground } from '../components/GridBackground';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const collections = useOutfitStore((state) => state.collections);
  const addCollection = useOutfitStore((state) => state.addCollection);
  const assignItemToCollection = useOutfitStore((state) => state.assignItemToCollection);
  const removeItemFromCollection = useOutfitStore((state) => state.removeItemFromCollection);
  const addMockData = useOutfitStore((state) => state.addMockData);

  const [activeTabId, setActiveTabId] = useState('all'); // 'all' or collection id
  const [modalVisible, setModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    if (clothes.length === 0) {
      addMockData();
    }
  }, [clothes, addMockData]);

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    addCollection(newCollectionName.trim());
    setNewCollectionName('');
    setModalVisible(false);
  };

  const toggleItemInCollection = useCallback((itemId: string) => {
    if (activeTabId === 'all') return;
    const col = collections.find(c => c.id === activeTabId);
    if (!col) return;

    if (col.itemIds.includes(itemId)) {
      removeItemFromCollection(itemId, activeTabId);
    } else {
      assignItemToCollection(itemId, activeTabId);
    }
  }, [activeTabId, collections, removeItemFromCollection, assignItemToCollection]);

  // Pre-compute the selected item IDs for O(1) lookup during FlatList render
  const activeCollectionItemIds = useMemo(() => {
    if (activeTabId === 'all') return new Set<string>();
    const col = collections.find(c => c.id === activeTabId);
    return new Set(col?.itemIds || []);
  }, [activeTabId, collections]);

  const renderClothingItem = useCallback(({ item }: { item: any }) => {
    const isSelectedInCurrentCollection = activeTabId !== 'all' && activeCollectionItemIds.has(item.id);

    return (
      <TouchableOpacity
        style={[styles.itemCard, activeTabId !== 'all' && isSelectedInCurrentCollection && styles.itemCardSelected]}
        onPress={() => activeTabId !== 'all' ? toggleItemInCollection(item.id) : null}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="shirt-outline" size={40} color="#111827" />
          </View>
        )}

        {activeTabId !== 'all' && isSelectedInCurrentCollection && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}

        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemPart}>{item.part}</Text>
          <View style={styles.tagsContainer}>
            {item.tags?.map((tag: string, index: number) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [activeTabId, activeCollectionItemIds, toggleItemInCollection]);

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>OUTFIT SWIPER</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity
               style={styles.iconButton}
               onPress={() => router.push('/macro-settings')}
               accessibilityRole="button"
               accessibilityLabel="設定"
             >
              <Ionicons name="options-outline" size={24} color="#111827" />
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <TouchableOpacity style={styles.swipeHeroButton} onPress={() => router.push('/swipe')}>
            <View style={styles.heroContent}>
              <Ionicons name="layers" size={28} color="#FFFFFF" style={styles.heroIcon} />
              <View>
                <Text style={styles.swipeHeroText}>SWIPE TO DECIDE</Text>
                <Text style={styles.swipeHeroSub}>今日のセットアップを決める</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTabId === 'all' && styles.activeTab]}
              onPress={() => setActiveTabId('all')}
            >
              <Text style={[styles.tabText, activeTabId === 'all' && styles.activeTabText]}>ALL</Text>
            </TouchableOpacity>

            {collections.map(col => (
              <TouchableOpacity
                key={col.id}
                style={[styles.tab, activeTabId === col.id && styles.activeTab]}
                onPress={() => setActiveTabId(col.id)}
              >
                <Text style={[styles.tabText, activeTabId === col.id && styles.activeTabText]}>{col.name}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addTabBtn}
              onPress={() => setModalVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="カテゴリーを追加"
            >
              <Ionicons name="add" size={20} color="#111827" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {activeTabId !== 'all' && (
          <View style={styles.collectionInfo}>
            <Ionicons name="information-circle-outline" size={16} color="#6B7280" style={{marginRight: 4}} />
            <Text style={styles.collectionInfoText}>タップしてこのカテゴリーに服を追加・削除</Text>
          </View>
        )}

        <View style={styles.listContainer}>
          {activeTabId === 'all' && (
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-item')}>
              <Text style={styles.addButtonText}>+ NEW ITEM</Text>
            </TouchableOpacity>
          )}

          <FlatList
            data={clothes}
            keyExtractor={(item) => item.id}
            renderItem={renderClothingItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Create Collection Modal */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>NEW CATEGORY</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="例: デート用, 宴会用"
                placeholderTextColor="#9CA3AF"
                value={newCollectionName}
                onChangeText={setNewCollectionName}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSave} onPress={handleCreateCollection}>
                  <Text style={styles.modalSaveText}>CREATE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: '900', color: '#111827' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 2, borderColor: '#111827' },

  heroSection: { paddingHorizontal: 24, marginBottom: 20 },
  swipeHeroButton: { backgroundColor: '#111827', padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroContent: { flexDirection: 'row', alignItems: 'center' },
  heroIcon: { marginRight: 15 },
  swipeHeroText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  swipeHeroSub: { color: '#9CA3AF', fontSize: 12, fontWeight: '700', marginTop: 2 },

  tabsWrapper: { marginBottom: 15 },
  tabContainer: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E5E7EB' },
  activeTab: { backgroundColor: '#111827', borderColor: '#111827' },
  tabText: { color: '#6B7280', fontWeight: '800', fontSize: 14 },
  activeTabText: { color: '#FFFFFF' },
  addTabBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#111827', borderStyle: 'dashed' },

  collectionInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 15 },
  collectionInfoText: { color: '#6B7280', fontSize: 12, fontWeight: '700' },

  listContainer: { flex: 1, paddingHorizontal: 24 },
  addButton: { width: '100%', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: '#111827', borderStyle: 'dashed' },
  addButtonText: { color: '#111827', fontWeight: '900', fontSize: 16 },

  row: { justifyContent: 'space-between', marginBottom: 15 },
  itemCard: { width: (width - 48 - 15) / 2, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 10, borderWidth: 2, borderColor: '#F3F4F6' },
  itemCardSelected: { borderColor: '#111827', backgroundColor: '#F9FAFB' },
  itemImage: { width: '100%', height: 120, borderRadius: 8, resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: 120, borderRadius: 8, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  checkBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#111827', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  itemInfo: { marginTop: 10 },
  itemName: { fontSize: 14, fontWeight: '800', color: '#111827', marginBottom: 2 },
  itemPart: { fontSize: 10, color: '#6B7280', fontWeight: '800', marginBottom: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tagBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 10, color: '#4B5563', fontWeight: '800' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 2, borderColor: '#111827' },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 15 },
  modalInput: { backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 2, borderColor: '#E5E7EB', color: '#111827', marginBottom: 20, fontWeight: '700' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  modalCancel: { padding: 10 },
  modalCancelText: { color: '#6B7280', fontWeight: '800', fontSize: 16 },
  modalSave: { backgroundColor: '#111827', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  modalSaveText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});
