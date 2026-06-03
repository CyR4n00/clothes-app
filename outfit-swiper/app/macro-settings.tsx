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
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 30,
    padding: 20,




    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 14, color: '#666666', marginBottom: 20, textAlign: 'center', lineHeight: 20 },
  list: { marginBottom: 20 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  itemText: { fontSize: 16, fontWeight: '800', color: '#111827' },
  controls: { flexDirection: 'row', gap: 10 },
  controlButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8 },
  controlText: { color: '#111827', fontWeight: '800' },
  saveButton: { backgroundColor: '#111827', padding: 15, borderRadius: 15, alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  cancelButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#111827', fontSize: 16, fontWeight: '800' },
});
