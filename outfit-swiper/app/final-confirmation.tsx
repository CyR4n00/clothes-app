import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';

const { width } = Dimensions.get('window');

export default function FinalConfirmationScreen() {
  const router = useRouter();
  const currentOutfit = useOutfitStore((state) => state.currentOutfit);
  const resetOutfit = useOutfitStore((state) => state.resetOutfit);

  const handleFinish = () => {
    resetOutfit();
    router.replace('/');
  };

  const selectedItems = useMemo(() => {
    return Object.entries(currentOutfit).map(([partName, item]) => {
      return { partName, item };
    });
  }, [currentOutfit]);

  return (
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.title}>今日のセットアップ</Text>
          <Text style={styles.subtitle}>Perfect Match!</Text>

          <View style={styles.collageContainer}>
            {selectedItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="shirt-outline" size={48} color="#9CA3AF" />
                <Text style={styles.emptyText}>アイテムが選ばれていません</Text>
              </View>
            ) : (
              selectedItems.map(({ partName, item }, index) => {
                const isFirst = index === 0;

                return (
                  <View key={item.id + index} style={[styles.collageItem, isFirst ? styles.firstItem : styles.subItem]}>
                    <Text style={styles.catLabel}>{partName}</Text>
                    {item.imageUrl ? (
                      <Image source={{ uri: item.imageUrl }} style={styles.collageImage} />
                    ) : (
                      <View style={styles.collagePlaceholder}>
                        <Ionicons name="shirt" size={isFirst ? 60 : 32} color="#9CA3AF" />
                      </View>
                    )}
                    <View style={styles.itemInfoOverlay}>
                      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.adContainer}>
            <Text style={styles.adText}>[広告] スポンサーリンク</Text>
          </View>

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>これで決定！ (ホームへ)</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollArea: { padding: 20 },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'center', marginTop: 10, color: '#111827', fontFamily: 'ZenDots' },
  subtitle: { fontSize: 16, fontWeight: '800', textAlign: 'center', color: '#8B5CF6', marginBottom: 30 },

  collageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 40,
    justifyContent: 'center',
  },
  emptyState: { width: '100%', height: 200, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  emptyText: { marginTop: 10, color: '#9CA3AF', fontWeight: '800' },

  collageItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  firstItem: {
    width: width - 40,
    height: 300,
  },
  subItem: {
    width: (width - 40 - 15) / 2,
    height: 180,
  },
  catLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
    fontSize: 10,
    fontWeight: '800',
    color: '#111827',
  },
  collageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  itemName: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  adContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    borderStyle: 'dashed'
  },
  adText: { color: '#999999', fontWeight: '800' },
  finishButton: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  finishButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
});
