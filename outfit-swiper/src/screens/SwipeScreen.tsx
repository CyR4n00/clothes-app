import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { ClothingItem, Category } from '../types';

const { width } = Dimensions.get('window');

interface SwipeScreenProps {
  navigation: any;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ navigation }) => {
  const { closet, userSettings, setSetupItem, currentSetup } = useStore();
  const [currentMacroIndex, setCurrentMacroIndex] = useState(0);

  const currentCategory = userSettings.macroOrder[currentMacroIndex];

  // Filter closet by current category
  const cards = useMemo(() => {
    return closet.filter(item => item.category === currentCategory);
  }, [closet, currentCategory]);

  const goToNextCategory = () => {
    if (currentMacroIndex < userSettings.macroOrder.length - 1) {
      setCurrentMacroIndex(prev => prev + 1);
    } else {
      navigation.navigate('FinalConfirmation');
    }
  };

  const handleSwipedRight = (cardIndex: number) => {
    const selectedItem = cards[cardIndex];
    setSetupItem(currentCategory, selectedItem);
    goToNextCategory();
  };

  const handleSwipedLeft = (cardIndex: number) => {
    // Next item in the same category
  };

  const handleSwipedTop = (cardIndex: number) => {
    // Hold/Keep (MVP: treat as left swipe for now or add to a "maybe" list later)
    console.log('Hold for later:', cards[cardIndex].name);
  };

  const handleSwipedAll = () => {
    // Only go to next category if we didn't just swipe right (which already called goToNextCategory)
    // Since state updates are asynchronous, we check the latest state directly from the store
    if (!useStore.getState().currentSetup[currentCategory]) {
       goToNextCategory();
    }
  };

  const handleSkip = () => {
    // Leave this category empty and proceed
    setSetupItem(currentCategory, undefined);
    goToNextCategory();
  };

  const renderCard = (card: ClothingItem | undefined) => {
    if (!card) return <View style={[styles.card, styles.emptyCard]}><Text>No items found</Text></View>;
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.imageUrl }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Text style={styles.cardSubtitle}>{card.style} • {card.season.join(', ')}</Text>
        </View>
      </View>
    );
  };

  if (!currentCategory) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select {currentCategory}</Text>
        <Text style={styles.progressText}>Step {currentMacroIndex + 1} of {userSettings.macroOrder.length}</Text>
      </View>

      <View style={styles.swiperContainer}>
        {cards.length > 0 ? (
          <Swiper
            key={currentCategory}
            cards={cards}
            renderCard={renderCard}
            onSwipedRight={handleSwipedRight}
            onSwipedLeft={handleSwipedLeft}
            onSwipedTop={handleSwipedTop}
            onSwipedAll={handleSwipedAll}
            cardIndex={0}
            backgroundColor={'#f5f5f5'}
            stackSize={3}
            disableBottomSwipe
            overlayLabels={{
              left: { title: 'NOPE', style: { label: { backgroundColor: 'red', color: 'white', fontSize: 24 } }, wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 } },
              right: { title: 'DECIDE', style: { label: { backgroundColor: 'green', color: 'white', fontSize: 24 } }, wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 } },
              top: { title: 'KEEP', style: { label: { backgroundColor: 'blue', color: 'white', fontSize: 24 } }, wrapper: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }
            }}
          />
        ) : (
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>No items found in {currentCategory}.</Text>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip {currentCategory}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip this category</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  swiperContainer: {
    flex: 1,
    marginTop: -40, // Adjust for swiper offset
  },
  card: {
    flex: 0.8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ddd',
  },
  cardDetails: {
    padding: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#e5e5ea',
    borderRadius: 25,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
});
