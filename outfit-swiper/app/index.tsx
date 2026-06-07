import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';

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

  const toggleItemInCollection = (itemId: string) => {
    if (activeTabId === 'all') return;
    const col = collections.find(c => c.id === activeTabId);
    if (!col) return;

    if (col.itemIds.includes(itemId)) {
      removeItemFromCollection(itemId, activeTabId);
    } else {
      assignItemToCollection(itemId, activeTabId);
    }
  };

  const renderClothingItem = ({ item }: { item: any }) => {
    let isSelectedInCurrentCollection = false;
    if (activeTabId !== 'all') {
      const col = collections.find(c => c.id === activeTabId);
      isSelectedInCurrentCollection = col?.itemIds.includes(item.id) || false;
    }

    return (
      <TouchableOpacity
        style={[styles.itemCard, activeTabId !== 'all' && isSelectedInCurrentCollection && styles.itemCardSelected]}
        onPress={() => activeTabId !== 'all' ? toggleItemInCollection(item.id) : null}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="shirt-outline" size={40} color="#666666" />
          </View>
        )}

        {activeTabId !== 'all' && isSelectedInCurrentCollection && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={16} color="white" />
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
  };

  // The displayed items in the grid. If "all", show everything. If collection, still show all, but selecting them adds/removes to collection.
  // Actually, wait, the user wants "see all clothes registered in the closet, and add them to the category".
  // If activeTab is 'all', just a normal view.
  // If activeTab is a collection, we could filter to only show items IN the collection?
  // But the prompt says "assign clothes to them by clicking the + button next to categories".
  // Let's make the "all" view the main closet.
  // In a specific collection tab, show ALL clothes, but highlight the ones in the collection so the user can toggle them.

  return (
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>キルコレ</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/macro-settings')}>
              <Ionicons name="settings-outline" size={24} color="#111827" />
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <LinearGradient colors={['#A78BFA', '#8B5CF6']} style={styles.swipeHeroButton} start={{x:0, y:0}} end={{x:1, y:1}}>
            <TouchableOpacity style={styles.swipeHeroInner} onPress={() => router.push('/swipe')}>
              <Ionicons name="layers" size={32} color="#FFFFFF" style={styles.heroIcon} />
              <Text style={styles.swipeHeroText}>今日のセットアップを決める</Text>
              <Text style={styles.swipeHeroSub}>スワイプして直感的に服を選ぶ</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTabId === 'all' && styles.activeTab]}
              onPress={() => setActiveTabId('all')}
            >
              <Text style={[styles.tabText, activeTabId === 'all' && styles.activeTabText]}>すべて</Text>
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

            <TouchableOpacity style={styles.addTabBtn} onPress={() => setModalVisible(true)}>
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
              <Text style={styles.addButtonText}>+ 新しい服を登録</Text>
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
              <Text style={styles.modalTitle}>新しいカテゴリーを作成</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="例: デート用, 宴会用"
                value={newCollectionName}
                onChangeText={setNewCollectionName}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCancelText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSave} onPress={handleCreateCollection}>
                  <Text style={styles.modalSaveText}>作成</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 28, fontFamily: 'ZenDots', color: '#111827' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },

  heroSection: { paddingHorizontal: 24, marginBottom: 20 },
  swipeHeroButton: { borderRadius: 24, padding: 2 },
  swipeHeroInner: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 24, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  heroIcon: { marginBottom: 10 },
  swipeHeroText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginBottom: 5 },
  swipeHeroSub: { color: '#EDE9FE', fontSize: 14, fontWeight: '600' },

  tabsWrapper: { marginBottom: 15 },
  tabContainer: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#E5E7EB' },
  activeTab: { backgroundColor: '#111827' },
  tabText: { color: '#6B7280', fontWeight: '800', fontSize: 14 },
  activeTabText: { color: '#FFFFFF' },
  addTabBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed' },

  collectionInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 15 },
  collectionInfoText: { color: '#6B7280', fontSize: 12, fontWeight: '700' },

  listContainer: { flex: 1, paddingHorizontal: 24 },
  addButton: { width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#D1D5DB', borderStyle: 'dashed' },
  addButtonText: { color: '#4B5563', fontWeight: '800', fontSize: 16 },

  row: { justifyContent: 'space-between', marginBottom: 15 },
  itemCard: { width: (width - 48 - 15) / 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: 10, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  itemCardSelected: { borderColor: '#8B5CF6', backgroundColor: '#F5F3FF' },
  itemImage: { width: '100%', height: 120, borderRadius: 12, resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: 120, borderRadius: 12, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  checkBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#8B5CF6', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  itemInfo: { marginTop: 10 },
  itemName: { fontSize: 14, fontWeight: '800', color: '#111827', marginBottom: 2 },
  itemPart: { fontSize: 10, color: '#8B5CF6', fontWeight: '800', marginBottom: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tagBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  tagText: { fontSize: 10, color: '#4B5563', fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#FAFBFC', borderRadius: 24, padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 15 },
  modalInput: { backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  modalCancel: { padding: 10 },
  modalCancelText: { color: '#6B7280', fontWeight: '800', fontSize: 16 },
  modalSave: { backgroundColor: '#111827', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  modalSaveText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});
