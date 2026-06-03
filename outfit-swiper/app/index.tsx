import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { Category, ClothingItem } from '../src/types';

const { width } = Dimensions.get('window');

export default function ClosetScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const [selectedSeason, setSelectedSeason] = useState<string>('すべて');

  const SEASONS = ['すべて', '春', '夏', '秋', '冬', '通年'];

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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>NOTHING (R)</Text>
          <Text style={styles.headerTitle}>CLOSET_OS</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>INDEXED ITEMS</Text>
          <Link href="/add-item" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
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
          </ScrollView>
        </View>

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
  greeting: { fontSize: 14, color: '#000000', marginBottom: 4, fontFamily: 'DotGothic' },
  headerTitle: { fontSize: 32, fontFamily: 'DotGothic', color: '#000000', lineHeight: 44, letterSpacing: -1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  seasonContainer: { marginBottom: 16 },
  seasonScroll: { paddingHorizontal: 20, gap: 10 },
  seasonTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
  },
  seasonTabActive: {
    backgroundColor: '#000000',
  },
  seasonTabText: {
    color: '#000000',
    fontFamily: 'DotGothic',
  },
  seasonTabTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: { fontSize: 18, fontFamily: 'DotGothic', color: '#000000' },
  addButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', zIndex: 10, borderWidth: 0 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 120 },
  itemCard: {
    width: (width - 48) / 2,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  itemImage: { width: 80, height: 80, borderRadius: 0, marginBottom: 12, borderWidth: 2, borderColor: '#000000' },
  placeholderImage: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#000000',
    width: 80,
    height: 80,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: { fontSize: 16, fontFamily: 'DotGothic', color: '#000000', marginBottom: 4, textAlign: 'center' },
  itemCategory: { fontSize: 12, color: '#666666', fontFamily: 'DotGothic' },
  emptyContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
  emptyText: { textAlign: 'center', marginTop: 16, fontSize: 18, color: '#000000', fontFamily: 'DotGothic' },
  emptyIcon: { fontSize: 60 },
  emptySubText: { textAlign: 'center', marginTop: 8, fontSize: 14, color: '#666666', fontFamily: 'DotGothic' },
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
