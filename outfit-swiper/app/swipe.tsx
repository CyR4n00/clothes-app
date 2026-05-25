import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { ClothingItem, Category } from '../src/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

export default function SwipeScreen() {
  const router = useRouter();
  const { clothes, macroOrder, currentOutfit, setOutfitItem, resetOutfit } = useOutfitStore();

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCards, setCurrentCards] = useState<ClothingItem[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // Initialize deck for current category
  useEffect(() => {
    if (currentCategoryIndex < macroOrder.length) {
      const targetCategory = macroOrder[currentCategoryIndex];
      const itemsForCategory = clothes.filter(item => item.category === targetCategory);
      setCurrentCards(itemsForCategory);
      setCardIndex(0);
    } else {
      // All categories selected, go to final screen
      router.replace('/final-confirmation');
    }
  }, [currentCategoryIndex, macroOrder, clothes, router]);

  const currentCategory = macroOrder[currentCategoryIndex];

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
      // Select item and move to next category
      setOutfitItem(currentCategory, item);
      position.setValue({ x: 0, y: 0 });
      setCurrentCategoryIndex(prev => prev + 1);
    } else if (direction === 'left') {
      // Skip: move to next card in current category
      position.setValue({ x: 0, y: 0 });
      setCardIndex(prev => prev + 1);
    } else if (direction === 'up') {
      // Hold: move the card to the end of the deck
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
          <Text style={styles.noMoreText}>このカテゴリーの服はもうありません。</Text>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => setCurrentCategoryIndex(prev => prev + 1)}
          >
            <Text style={styles.skipButtonText}>スキップして次のカテゴリーへ</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return currentCards.map((item, index) => {
      if (index < cardIndex) return null;
      if (index === cardIndex) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <View key={item.id} style={[styles.cardStyle, { top: 10 * (index - cardIndex) }]}>
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
    let emoji = '👕';
    if (item.category === 'シューズ') emoji = '👟';
    if (item.category === 'パンツ') emoji = '👖';
    if (item.category === 'アウター') emoji = '🧥';
    if (item.category === 'アクセサリー') emoji = '🧢';

    return (
      <View style={styles.card}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={{fontSize: 80}}>{emoji}</Text>
          </View>
        )}
        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{currentCategory} を選ぶ</Text>
        <Text style={styles.subHeaderText}>右: 決定 | 左: パス | 上: 後回し</Text>
      </View>

      <View style={styles.deckContainer}>
        {renderCards()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  subHeaderText: { fontSize: 14, color: '#666', marginTop: 5 },
  deckContainer: { flex: 1, marginTop: 20 },
  cardStyle: { position: 'absolute', width: SCREEN_WIDTH, paddingHorizontal: 20 },
  card: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: { flex: 1, width: '100%', height: null, resizeMode: 'cover' },
  placeholderImage: { flex: 1, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#888', fontSize: 18 },
  cardDetails: { padding: 20, backgroundColor: 'white' },
  cardName: { fontSize: 24, fontWeight: 'bold' },
  cardCategory: { fontSize: 16, color: '#666', marginTop: 5 },
  noMoreCards: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noMoreText: { fontSize: 18, color: '#666', marginBottom: 20, textAlign: 'center' },
  skipButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10 },
  skipButtonText: { color: 'white', fontWeight: 'bold' }
});
