import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { Category, ClothingItem } from '../types';

interface FinalConfirmationScreenProps {
  navigation: any;
}

export const FinalConfirmationScreen: React.FC<FinalConfirmationScreenProps> = ({ navigation }) => {
  const { currentSetup, userSettings, clearSetup } = useStore();
  const [showAdModal, setShowAdModal] = useState(false);

  const handleFinish = () => {
    // Show Ad before finalizing
    setShowAdModal(true);
  };

  const closeAdAndComplete = () => {
    setShowAdModal(false);
    clearSetup();
    navigation.navigate('Closet'); // Or Home
  };

  const renderSetupItem = (category: Category) => {
    const item = currentSetup[category];
    return (
      <View key={category} style={styles.setupRow}>
        <Text style={styles.categoryLabel}>{category}</Text>
        {item ? (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          </View>
        ) : (
          <View style={[styles.itemCard, styles.emptyItemCard]}>
            <Text style={styles.emptyText}>Skipped</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Outfit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {userSettings.macroOrder.map(renderSetupItem)}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.restartButton} onPress={() => navigation.goBack()}>
          <Text style={styles.restartButtonText}>Change Something</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Looks Good!</Text>
        </TouchableOpacity>
      </View>

      {/* Mock Full-Screen Ad Modal */}
      <Modal visible={showAdModal} animationType="slide">
        <SafeAreaView style={styles.adContainer}>
          <Text style={styles.adTitle}>Advertisement</Text>
          <View style={styles.adContent}>
            <Text style={styles.adText}>[ Google AdSense Space ]</Text>
            <Text style={styles.adSubText}>Unlock Premium to remove ads and get AI recommendations!</Text>
          </View>
          <TouchableOpacity style={styles.closeAdButton} onPress={closeAdAndComplete}>
            <Text style={styles.closeAdText}>Close Ad & Save Outfit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  setupRow: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyItemCard: {
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#e5e5ea',
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  footer: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  restartButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#e5e5ea',
    borderRadius: 25,
    alignItems: 'center',
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  finishButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  // Ad Modal Styles
  adContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  adTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  adContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
    borderRadius: 12,
  },
  adText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  adSubText: {
    marginTop: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  closeAdButton: {
    paddingVertical: 16,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
  },
  closeAdText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
