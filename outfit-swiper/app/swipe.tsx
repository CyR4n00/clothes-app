import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';
import { ClothingItem } from '../src/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export default function SwipeScreen() {
  const router = useRouter();
  const { clothes, collections, macroOrder, currentOutfit, setOutfitItem } = useOutfitStore();

  // Modal for picking a collection before swiping
  const [collectionModalVisible, setCollectionModalVisible] = useState(true);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const [currentMacroIndex, setCurrentMacroIndex] = useState(0);
  const [currentCards, setCurrentCards] = useState<ClothingItem[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // Initialize deck for current macro part, filtering by selected collection
  useEffect(() => {
    if (collectionModalVisible || !selectedCollectionId) return;

    if (currentMacroIndex < macroOrder.length) {
      const currentPart = macroOrder[currentMacroIndex];

      // Get all items in the selected collection
      let collectionItemIds: string[] = [];
      if (selectedCollectionId === 'all') {
        collectionItemIds = clothes.map(c => c.id);
      } else {
        const col = collections.find(c => c.id === selectedCollectionId);
        if (col) collectionItemIds = col.itemIds;
      }

      // Filter clothes to those in the collection AND matching the current part
      const itemsForPart = clothes.filter(c =>
        c.part === currentPart && collectionItemIds.includes(c.id)
      );

      setCurrentCards(itemsForPart);
      setCardIndex(0);
    } else {
      // All parts selected, go to final screen
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
          <Text style={styles.noMoreText}>この部位にはもう服がありません。</Text>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => setCurrentMacroIndex(prev => prev + 1)}
          >
            <Text style={styles.skipButtonText}>スキップして次へ</Text>
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
            <Ionicons name="shirt-outline" size={80} color="#9CA3AF" />
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
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal visible={collectionModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>どのカテゴリーから選びますか？</Text>
              <ScrollView style={{ maxHeight: 300 }}>
                <TouchableOpacity
                  style={styles.modalColBtn}
                  onPress={() => { setSelectedCollectionId('all'); setCollectionModalVisible(false); }}
                >
                  <Text style={styles.modalColText}>すべての服</Text>
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
                <Text style={styles.modalCancelText}>戻る</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {!collectionModalVisible && (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#FAFBFC', borderRadius: 24, padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 20, textAlign: 'center' },
  modalColBtn: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', alignItems: 'center' },
  modalColText: { fontSize: 16, fontWeight: '800', color: '#4C1D95' },
  modalCancelBtn: { marginTop: 20, backgroundColor: '#E5E7EB', padding: 15, borderRadius: 12, alignItems: 'center' },
  modalCancelText: { color: '#4B5563', fontWeight: '800', fontSize: 16 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  closeButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  headerCenter: { alignItems: 'center' },
  stepText: { fontSize: 12, fontWeight: '800', color: '#8B5CF6', marginBottom: 4 },
  headerText: { fontSize: 24, fontWeight: '800', color: '#111827' },
  deckContainer: { flex: 1, marginTop: 20 },
  cardStyle: { position: 'absolute', width: SCREEN_WIDTH, paddingHorizontal: 20 },
  card: {
    height: 450,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  cardImage: { flex: 1, width: '100%', height: null, resizeMode: 'cover' },
  placeholderImage: { flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center' },
  cardDetails: { padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)' },
  cardName: { fontSize: 24, fontWeight: '800', color: '#111827' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 },
  cardTag: { fontSize: 14, color: '#6D28D9', fontWeight: '800' },
  noMoreCards: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noMoreText: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center', fontWeight: '800' },
  skipButton: { backgroundColor: '#111827', padding: 15, borderRadius: 15 },
  skipButtonText: { color: 'white', fontWeight: '800', fontSize: 16 }
});
