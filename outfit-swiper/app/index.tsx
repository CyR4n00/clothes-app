import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
            <Ionicons name="shirt-outline" size={40} color="#39FF14" />
          </View>
        )}

        {activeTabId !== 'all' && isSelectedInCurrentCollection && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={16} color="#050505" />
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

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>OUTFIT SWIPER</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/macro-settings')}>
              <Ionicons name="settings-outline" size={24} color="#39FF14" />
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <TouchableOpacity style={styles.swipeHeroButton} onPress={() => router.push('/swipe')}>
            <Ionicons name="layers" size={32} color="#050505" style={styles.heroIcon} />
            <Text style={styles.swipeHeroText}>SWIPE TO DECIDE</Text>
            <Text style={styles.swipeHeroSub}>今日のセットアップを決める</Text>
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

            <TouchableOpacity style={styles.addTabBtn} onPress={() => setModalVisible(true)}>
              <Ionicons name="add" size={20} color="#39FF14" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {activeTabId !== 'all' && (
          <View style={styles.collectionInfo}>
            <Ionicons name="information-circle-outline" size={16} color="#FF00FF" style={{marginRight: 4}} />
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
                placeholderTextColor="#666"
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
  container: { flex: 1, backgroundColor: '#050505' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontFamily: 'Orbitron-Bold', color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, backgroundColor: 'rgba(57, 255, 20, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#39FF14' },

  heroSection: { paddingHorizontal: 24, marginBottom: 20 },
  swipeHeroButton: { backgroundColor: '#39FF14', padding: 24, borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 },
  heroIcon: { marginBottom: 10 },
  swipeHeroText: { color: '#050505', fontSize: 22, fontFamily: 'Orbitron-Bold', marginBottom: 5 },
  swipeHeroSub: { color: '#050505', fontSize: 14, fontFamily: 'DotGothic16-Regular' },

  tabsWrapper: { marginBottom: 15 },
  tabContainer: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: '#333' },
  activeTab: { backgroundColor: 'rgba(57, 255, 20, 0.2)', borderColor: '#39FF14' },
  tabText: { color: '#888', fontFamily: 'Orbitron-Regular', fontSize: 14 },
  activeTabText: { color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5 },
  addTabBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(57, 255, 20, 0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#39FF14', borderStyle: 'dashed' },

  collectionInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 15 },
  collectionInfoText: { color: '#FF00FF', fontSize: 12, fontFamily: 'DotGothic16-Regular' },

  listContainer: { flex: 1, paddingHorizontal: 24 },
  addButton: { width: '100%', backgroundColor: 'rgba(57, 255, 20, 0.05)', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#39FF14', borderStyle: 'dashed' },
  addButtonText: { color: '#39FF14', fontFamily: 'Orbitron-Bold', fontSize: 16 },

  row: { justifyContent: 'space-between', marginBottom: 15 },
  itemCard: { width: (width - 48 - 15) / 2, backgroundColor: '#111', borderRadius: 20, padding: 10, elevation: 2, borderWidth: 1, borderColor: '#333' },
  itemCardSelected: { borderColor: '#FF00FF', backgroundColor: 'rgba(255, 0, 255, 0.1)' },
  itemImage: { width: '100%', height: 120, borderRadius: 12, resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: 120, borderRadius: 12, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333', borderStyle: 'dashed' },
  checkBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#FF00FF', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', zIndex: 10, shadowColor: '#FF00FF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 5 },
  itemInfo: { marginTop: 10 },
  itemName: { fontSize: 14, fontFamily: 'DotGothic16-Regular', color: '#FFF', marginBottom: 2 },
  itemPart: { fontSize: 10, color: '#39FF14', fontFamily: 'Orbitron-Regular', marginBottom: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tagBadge: { backgroundColor: 'rgba(0, 255, 255, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#00FFFF' },
  tagText: { fontSize: 10, color: '#00FFFF', fontFamily: 'DotGothic16-Regular' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#111', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#39FF14' },
  modalTitle: { fontSize: 18, fontFamily: 'Orbitron-Bold', color: '#39FF14', marginBottom: 15 },
  modalInput: { backgroundColor: '#222', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#333', color: '#FFF', marginBottom: 20, fontFamily: 'DotGothic16-Regular' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  modalCancel: { padding: 10 },
  modalCancelText: { color: '#888', fontFamily: 'Orbitron-Bold', fontSize: 16 },
  modalSave: { backgroundColor: '#39FF14', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  modalSaveText: { color: '#050505', fontFamily: 'Orbitron-Bold', fontSize: 16 },
});
