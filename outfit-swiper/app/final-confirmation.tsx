import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { GridBackground } from '../components/GridBackground';

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
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.title}>FINAL OUTFIT</Text>
          <Text style={styles.subtitle}>THE LOOK</Text>

          <View style={styles.collageContainer}>
            {selectedItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="shirt-outline" size={48} color="#111827" />
                <Text style={styles.emptyText}>NO ITEMS SELECTED</Text>
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
                        <Ionicons name="shirt" size={isFirst ? 60 : 32} color="#111827" />
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
            <Text style={styles.adText}>[ ADVERTISEMENT SLOT ]</Text>
          </View>

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>CONFIRM & RETURN</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollArea: { padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginTop: 10, color: '#111827', fontWeight: '900' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6B7280', marginBottom: 30, fontWeight: '700' },

  collageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 40,
    justifyContent: 'center',
  },
  emptyState: { width: '100%', height: 200, backgroundColor: '#F9FAFB', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  emptyText: { marginTop: 10, color: '#111827', fontWeight: '900' },

  collageItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    borderWidth: 2,
    borderColor: '#111827',
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
    backgroundColor: '#111827',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  collageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#111827',
  },
  itemName: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 14,
  },

  adContainer: {
    backgroundColor: '#F9FAFB',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed'
  },
  adText: { color: '#9CA3AF', fontWeight: '800' },
  finishButton: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  finishButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
