import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GridBackground } from '../components/GridBackground';

const { width } = Dimensions.get('window');

const dummyCommunityOutfits = [
  { id: '1', user: 'StreetWearFan', likes: 120, tags: ['#Street', '#Casual'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Outfit+1' },
  { id: '2', user: 'MinimalistGuru', likes: 85, tags: ['#Monochrome'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Outfit+2' },
  { id: '3', user: 'TechWearBoy', likes: 210, tags: ['#Techwear', '#Dark'], imageUrl: 'https://via.placeholder.com/400x500/F3F4F6/111827?text=Outfit+3' },
];

export default function ExploreScreen() {
  const router = useRouter();

  const renderOutfit = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.username}>@{item.user}</Text>
        <View style={styles.statsRow}>
          <Ionicons name="heart" size={16} color="#111827" />
          <Text style={styles.likes}>{item.likes}</Text>
        </View>
      </View>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag: string) => (
          <View key={tag} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.paywallOverlay}>
        <Ionicons name="lock-closed" size={32} color="#111827" style={{ marginBottom: 10 }} />
        <Text style={styles.paywallText}>PREMIUM ONLY</Text>
        <TouchableOpacity style={styles.unlockButton} onPress={() => router.push('/paywall')}>
          <Text style={styles.unlockButtonText}>UNLOCK</Text>
        </TouchableOpacity>
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
          data={dummyCommunityOutfits}
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
  unlockButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 }
});
