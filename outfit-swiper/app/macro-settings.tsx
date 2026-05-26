import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient colors={['#E5D9F2', '#F5EFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.glassCard}>
            <Text style={styles.title}>カテゴリの選択順</Text>
            <Text style={styles.description}>
              スワイプして服を選ぶ順番を設定します。上から順に選んでいきます。
            </Text>

            <View style={styles.list}>
              {currentOrder.map((cat, index) => (
                <View key={cat} style={styles.listItem}>
                  <Text style={styles.itemText}>{index + 1}. {cat}</Text>
                  <View style={styles.controls}>
                    <TouchableOpacity onPress={() => moveUp(index)} style={styles.controlButton}>
                      <Text style={styles.controlText}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => moveDown(index)} style={styles.controlButton}>
                      <Text style={styles.controlText}>↓</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>戻る</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4C1D95', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 14, color: '#6D28D9', marginBottom: 20, textAlign: 'center', lineHeight: 20 },
  list: { marginBottom: 20 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  itemText: { fontSize: 16, fontWeight: 'bold', color: '#4C1D95' },
  controls: { flexDirection: 'row', gap: 10 },
  controlButton: { padding: 10, backgroundColor: '#F5F3FF', borderRadius: 8 },
  controlText: { color: '#8B5CF6', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#A78BFA', padding: 15, borderRadius: 15, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#8B5CF6', fontSize: 16, fontWeight: 'bold' },
});
