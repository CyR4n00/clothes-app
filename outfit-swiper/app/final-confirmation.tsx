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
          <Text style={styles.subtitle}>// SYSTEM MATCH DETECTED</Text>

          <View style={styles.collageContainer}>
            {selectedItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="shirt-outline" size={48} color="#FF00FF" />
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
                        <Ionicons name="shirt" size={isFirst ? 60 : 32} color="#39FF14" />
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
  container: { flex: 1, backgroundColor: '#050505' },
  scrollArea: { padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginTop: 10, color: '#39FF14', fontFamily: 'Orbitron-Bold', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#00FFFF', marginBottom: 30, fontFamily: 'DotGothic16-Regular' },

  collageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 40,
    justifyContent: 'center',
  },
  emptyState: { width: '100%', height: 200, backgroundColor: 'rgba(255, 0, 255, 0.05)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FF00FF', borderStyle: 'dashed' },
  emptyText: { marginTop: 10, color: '#FF00FF', fontFamily: 'Orbitron-Bold' },

  collageItem: {
    backgroundColor: '#111',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    borderWidth: 1,
    borderColor: '#39FF14',
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
    backgroundColor: 'rgba(57, 255, 20, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
    fontSize: 10,
    fontFamily: 'Orbitron-Bold',
    color: '#050505',
  },
  collageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#39FF14',
  },
  itemName: {
    color: '#FFF',
    fontFamily: 'DotGothic16-Regular',
    fontSize: 14,
  },

  adContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed'
  },
  adText: { color: '#666', fontFamily: 'Orbitron-Regular' },
  finishButton: {
    backgroundColor: '#39FF14',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  finishButtonText: { color: '#050505', fontSize: 18, fontFamily: 'Orbitron-Bold' },
});
