import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';
import { Category, ClothingItem } from '../src/types';

const { width } = Dimensions.get('window');

export default function ClosetScreen() {
  const router = useRouter();
  const clothes = useOutfitStore((state) => state.clothes);
  const addMockClothes = useOutfitStore((state) => state.addMockClothes);

  React.useEffect(() => {
    if (clothes.length === 0) {
      addMockClothes();
    }
  }, []);

  const renderItem = ({ item }: { item: ClothingItem }) => {
    let emoji = '👕';
    if (item.category === 'シューズ') emoji = '👟';
    if (item.category === 'パンツ') emoji = '👖';
    if (item.category === 'アウター') emoji = '🧥';
    if (item.category === 'アクセサリー') emoji = '🧢';

    return (
      <View style={styles.itemCard}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={{fontSize: 40}}>{emoji}</Text>
          </View>
        )}
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#E5D9F2', '#F5EFFF', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>こんにちは、</Text>
          <Text style={styles.headerTitle}>今日の服を{'\n'}決めましょう！</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>あなたのクローゼット</Text>
          <Link href="/add-item" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Text style={{color: '#A78BFA', fontSize: 24, lineHeight: 26, fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          data={clothes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyText}>服がありません</Text>
              <Text style={styles.emptySubText}>上の「+」ボタンから追加してください</Text>
            </View>
          }
        />

        <View style={styles.floatingNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/paywall')}>
            <Text style={{fontSize: 24}}>✨</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainNavButton} onPress={() => router.push('/swipe')}>
            <LinearGradient
              colors={['#A78BFA', '#8B5CF6']}
              style={styles.mainNavGradient}
            >
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>▶</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/macro-settings')}>
            <Text style={{fontSize: 24}}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 20 },
  greeting: { fontSize: 18, color: '#8B5CF6', fontWeight: '600', marginBottom: 4 },
  headerTitle: { fontSize: 36, fontWeight: 'bold', color: '#4C1D95', lineHeight: 42 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#6D28D9' },
  addButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#EDE9FE', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 120 },
  itemCard: {
    width: (width - 48) / 2,
    margin: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  itemImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: { fontSize: 16, fontWeight: '700', color: '#4C1D95', marginBottom: 4, textAlign: 'center' },
  itemCategory: { fontSize: 12, color: '#8B5CF6', fontWeight: '500' },
  emptyContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
  emptyText: { textAlign: 'center', marginTop: 16, fontSize: 18, color: '#8B5CF6', fontWeight: 'bold' },
  emptyIcon: { fontSize: 60 },
  emptySubText: { textAlign: 'center', marginTop: 8, fontSize: 14, color: '#A78BFA' },
  floatingNav: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 240,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 35,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
  },
  navItem: { padding: 12 },
  mainNavButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: -30,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  mainNavGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
