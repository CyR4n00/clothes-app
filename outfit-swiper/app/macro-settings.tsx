import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { Category } from '../src/types';

export default function MacroSettingsScreen() {
  const router = useRouter();
  const macroOrder = useOutfitStore((state) => state.macroOrder);
  const setMacroOrder = useOutfitStore((state) => state.setMacroOrder);

  // 簡易的な順序変更 (本来はドラッグ＆ドロップライブラリ等を使用)
  const [currentOrder, setCurrentOrder] = useState<Category[]>([...macroOrder]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setCurrentOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setCurrentOrder(newOrder);
  };

  const handleSave = () => {
    setMacroOrder(currentOrder);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        スワイプして服を選ぶ順番を設定します。上から順に選んでいきます。
      </Text>

      <View style={styles.list}>
        {currentOrder.map((cat, index) => (
          <View key={cat} style={styles.listItem}>
            <Text style={styles.itemText}>{index + 1}. {cat}</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => moveUp(index)} style={styles.controlButton}>
                <Text>↑</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => moveDown(index)} style={styles.controlButton}>
                <Text>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>保存</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  description: { fontSize: 16, color: '#666', marginBottom: 20 },
  list: { flex: 1 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  controls: { flexDirection: 'row', gap: 10 },
  controlButton: { padding: 10, backgroundColor: '#ddd', borderRadius: 5 },
  saveButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
