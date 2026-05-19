import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { Category } from '../types';

export const MacroSettingsScreen = ({ navigation }: any) => {
  const { userSettings, updateMacroOrder } = useStore();
  const currentOrder = userSettings.macroOrder;

  // Simple mock implementation for changing order
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    updateMacroOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    updateMacroOrder(newOrder);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Swipe Order</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.instructions}>
          Customize the order in which you decide your outfit parts.
        </Text>
        {currentOrder.map((category, index) => (
          <View key={category} style={styles.row}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.categoryName}>{category}</Text>
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.btn, index === 0 && styles.btnDisabled]}
                onPress={() => moveUp(index)}
                disabled={index === 0}
              >
                <Text style={styles.btnText}>↑</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, index === currentOrder.length - 1 && styles.btnDisabled]}
                onPress={() => moveDown(index)}
                disabled={index === currentOrder.length - 1}
              >
                <Text style={styles.btnText}>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    width: 36,
    height: 36,
    backgroundColor: '#e5e5ea',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.3,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
