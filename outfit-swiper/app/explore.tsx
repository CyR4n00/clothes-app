import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// SNS風のタイムラインモックデータ
const MOCK_POSTS = [
  {
    id: '1',
    user: 'Yuta',
    avatar: 'https://i.pravatar.cc/150?u=yuta',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    description: '春のシンプルモノトーンコーデ。アウターは古着です。 #春コーデ #モノトーン',
    likes: 124,
  },
  {
    id: '2',
    user: 'Saki',
    avatar: 'https://i.pravatar.cc/150?u=saki',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=400',
    description: 'お気に入りの白スニーカーを使ったカジュアルセットアップ！',
    likes: 89,
  },
  {
    id: '3',
    user: 'Kenji',
    avatar: 'https://i.pravatar.cc/150?u=kenji',
    image: 'https://images.unsplash.com/photo-1550614000-4b95d466f366?auto=format&fit=crop&q=80&w=400',
    description: '今日の出社服。ジャケットでカチッと。',
    likes: 256,
  }
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#F8F9FA', '#FFFFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>みんなのコーデ</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollArea}>
          {MOCK_POSTS.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{post.user}</Text>
              </View>

              <Image source={{ uri: post.image }} style={styles.postImage} />

              <View style={styles.postFooter}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>❤️</Text>
                  <Text style={styles.actionCount}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>➕ クローゼットに追加</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.description}>{post.description}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)'
  },
  backButtonText: { fontSize: 16, color: '#1A1A1A', fontWeight: 'bold' },
  scrollArea: { padding: 16, paddingBottom: 100 },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  username: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  postImage: { width: '100%', height: 300, borderRadius: 16, marginBottom: 12 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  actionIcon: { fontSize: 16, marginRight: 6 },
  actionCount: { fontSize: 14, fontWeight: 'bold', color: '#666666' },
  description: { fontSize: 14, color: '#333333', lineHeight: 20 },
});
