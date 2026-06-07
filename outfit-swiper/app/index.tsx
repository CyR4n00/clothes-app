import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const categories = useOutfitStore((state) => state.categories);
  const addMockData = useOutfitStore((state) => state.addMockData);
  const [activeTab, setActiveTab] = useState('closet');

  useEffect(() => {
    if (clothes.length === 0) {
      addMockData();
    }
  }, [clothes, addMockData]);

  const renderClothingItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemCard}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="shirt-outline" size={40} color="#666666" />
        </View>
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
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

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'closet' && styles.activeTab]} onPress={() => setActiveTab('closet')}>
            <Text style={[styles.tabText, activeTab === 'closet' && styles.activeTabText]}>クローゼット</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'categories' && styles.activeTab]} onPress={() => setActiveTab('categories')}>
            <Text style={[styles.tabText, activeTab === 'categories' && styles.activeTabText]}>カテゴリー別</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'closet' ? (
          <View style={styles.listContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-item')}>
              <Text style={styles.addButtonText}>+ 新しい服を登録</Text>
            </TouchableOpacity>
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
        ) : (
          <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 100 }}>
            {categories.map(cat => {
              const catClothes = cat.itemIds.map(id => clothes.find(c => c.id === id)).filter(Boolean);
              return (
                <View key={cat.id} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{cat.name} ({catClothes.length})</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {catClothes.map(item => (
                      <View key={item?.id} style={styles.miniCard}>
                        {item?.imageUrl ? (
                           <Image source={{ uri: item.imageUrl }} style={styles.miniImage} />
                        ) : (
                           <View style={styles.miniPlaceholder}>
                             <Ionicons name="shirt" size={24} color="#9ca3af" />
                           </View>
                        )}
                        <Text style={styles.miniName} numberOfLines={1}>{item?.name}</Text>
                      </View>
                    ))}
                    {catClothes.length === 0 && (
                      <View style={styles.emptyCat}><Text style={styles.emptyCatText}>アイテムがありません</Text></View>
                    )}
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        )}
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

  tabContainer: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 15, gap: 10 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#E5E7EB' },
  activeTab: { backgroundColor: '#111827' },
  tabText: { color: '#6B7280', fontWeight: '800', fontSize: 14 },
  activeTabText: { color: '#FFFFFF' },

  listContainer: { flex: 1, paddingHorizontal: 24 },
  addButton: { width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', padding: 15, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#D1D5DB', borderStyle: 'dashed' },
  addButtonText: { color: '#4B5563', fontWeight: '800', fontSize: 16 },

  row: { justifyContent: 'space-between', marginBottom: 15 },
  itemCard: { width: (width - 48 - 15) / 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: 10, elevation: 2, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
  itemImage: { width: '100%', height: 120, borderRadius: 12, resizeMode: 'cover' },
  placeholderImage: { width: '100%', height: 120, borderRadius: 12, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  itemInfo: { marginTop: 10 },
  itemName: { fontSize: 14, fontWeight: '800', color: '#111827', marginBottom: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tagBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  tagText: { fontSize: 10, color: '#4B5563', fontWeight: '700' },

  categorySection: { marginBottom: 25 },
  categoryTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 10 },
  horizontalScroll: { paddingBottom: 10 },
  miniCard: { width: 100, marginRight: 15, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  miniImage: { width: '100%', height: 80, borderRadius: 10, marginBottom: 5 },
  miniPlaceholder: { width: '100%', height: 80, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  miniName: { fontSize: 12, fontWeight: '700', color: '#4B5563', textAlign: 'center' },
  emptyCat: { padding: 20, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  emptyCatText: { color: '#9CA3AF', fontSize: 12, fontWeight: '800' }
});
