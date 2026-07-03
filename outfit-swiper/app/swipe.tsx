import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { ClothingItem } from '../src/types';
import { GridBackground } from '../components/GridBackground';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export default function SwipeScreen() {
  const router = useRouter();
  const { clothes, collections, macroOrder, currentOutfit, setOutfitItem } = useOutfitStore();

  const [collectionModalVisible, setCollectionModalVisible] = useState(true);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const [currentMacroIndex, setCurrentMacroIndex] = useState(0);
  const [currentCards, setCurrentCards] = useState<ClothingItem[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (collectionModalVisible || !selectedCollectionId) return;

    if (currentMacroIndex < macroOrder.length) {
      const currentPart = macroOrder[currentMacroIndex];

      let collectionItemIds: string[] = [];
      if (selectedCollectionId === 'all') {
        collectionItemIds = clothes.map(c => c.id);
      } else {
        const col = collections.find(c => c.id === selectedCollectionId);
        if (col) collectionItemIds = col.itemIds;
      }

      const itemsForPart = clothes.filter(c =>
        c.part === currentPart && collectionItemIds.includes(c.id)
      );

      setCurrentCards(itemsForPart);
      setCardIndex(0);
    } else {
      router.replace('/final-confirmation');
    }
  }, [currentMacroIndex, macroOrder, collections, clothes, router, collectionModalVisible, selectedCollectionId]);

  const currentPartName = macroOrder[currentMacroIndex];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else if (gesture.dy < -SWIPE_THRESHOLD) {
        forceSwipe('up');
      } else {
        resetPosition();
      }
    }
  });

  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    let x = 0;
    let y = 0;
    if (direction === 'right') x = SCREEN_WIDTH * 1.5;
    if (direction === 'left') x = -SCREEN_WIDTH * 1.5;
    if (direction === 'up') y = -SCREEN_WIDTH * 1.5;

    Animated.timing(position, {
      toValue: { x, y },
      duration: 250,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left' | 'up') => {
    const item = currentCards[cardIndex];
    if (direction === 'right') {
      setOutfitItem(currentPartName, item);
      position.setValue({ x: 0, y: 0 });
      setCurrentMacroIndex(prev => prev + 1);
    } else if (direction === 'left') {
      position.setValue({ x: 0, y: 0 });
      setCardIndex(prev => prev + 1);
    } else if (direction === 'up') {
      position.setValue({ x: 0, y: 0 });
      setCurrentCards(prev => {
        const newCards = [...prev];
        const [heldItem] = newCards.splice(cardIndex, 1);
        newCards.push(heldItem);
        return newCards;
      });
    }
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const renderCards = () => {
    if (cardIndex >= currentCards.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>OUT OF ITEMS</Text>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => setCurrentMacroIndex(prev => prev + 1)}
          >
            <Text style={styles.skipButtonText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return currentCards.map((item, index) => {
      if (index < cardIndex) return null;
      if (index === cardIndex) {
        return (
          <Animated.View
            key={item.id + index}
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <View key={item.id + index} style={[styles.cardStyle, { top: 10 * (index - cardIndex) }]}>
          {renderCard(item)}
        </View>
      );
    }).reverse();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
      cursor: 'grab' as any
    };
  };

  const renderCard = (item: ClothingItem) => {
    return (
      <View style={styles.card}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="shirt-outline" size={80} color="#111827" />
          </View>
        )}
        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{item.name}</Text>
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {item.tags.map((tag, i) => (
                <Text key={i} style={styles.cardTag}>#{tag}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <Modal visible={collectionModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>SELECT COLLECTION</Text>
              <ScrollView style={{ maxHeight: 300 }}>
                <TouchableOpacity
                  style={styles.modalColBtn}
                  onPress={() => { setSelectedCollectionId('all'); setCollectionModalVisible(false); }}
                >
                  <Text style={styles.modalColText}>ALL CLOTHES</Text>
                </TouchableOpacity>
                {collections.map(col => (
                  <TouchableOpacity
                    key={col.id}
                    style={styles.modalColBtn}
                    onPress={() => { setSelectedCollectionId(col.id); setCollectionModalVisible(false); }}
                  >
                    <Text style={styles.modalColText}>{col.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => router.back()}>
                <Text style={styles.modalCancelText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {!collectionModalVisible && (
          <>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="閉じる"
              >
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
              <View style={styles.headerCenter}>
                <Text style={styles.stepText}>STEP {currentMacroIndex + 1} / {macroOrder.length}</Text>
                <Text style={styles.headerText}>{currentPartName}</Text>
              </View>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.deckContainer}>
              {renderCards()}
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 2, borderColor: '#111827' },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 20, textAlign: 'center' },
  modalColBtn: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', alignItems: 'center' },
  modalColText: { fontSize: 16, fontWeight: '900', color: '#111827' },
  modalCancelBtn: { marginTop: 20, backgroundColor: '#F3F4F6', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB' },
  modalCancelText: { color: '#4B5563', fontWeight: '800', fontSize: 16 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  closeButton: { padding: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 2, borderColor: '#111827' },
  headerCenter: { alignItems: 'center' },
  stepText: { fontSize: 12, fontWeight: '900', color: '#6B7280', marginBottom: 4 },
  headerText: { fontSize: 24, fontWeight: '900', color: '#111827' },
  deckContainer: { flex: 1, marginTop: 20 },
  cardStyle: { position: 'absolute', width: SCREEN_WIDTH, paddingHorizontal: 20 },
  card: {
    height: 450,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    elevation: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#111827',
  },
  cardImage: { flex: 1, width: '100%', height: null, resizeMode: 'cover' },
  placeholderImage: { flex: 1, backgroundColor: '#F9FAFB', borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  cardDetails: { padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 2, borderTopColor: '#111827' },
  cardName: { fontSize: 24, fontWeight: '900', color: '#111827' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 },
  cardTag: { fontSize: 14, color: '#4B5563', fontWeight: '800' },
  noMoreCards: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noMoreText: { fontSize: 18, color: '#111827', marginBottom: 20, textAlign: 'center', fontWeight: '900' },
  skipButton: { backgroundColor: '#111827', padding: 15, borderRadius: 15 },
  skipButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 }
});
