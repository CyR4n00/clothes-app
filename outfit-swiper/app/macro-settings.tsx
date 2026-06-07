import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, Alert, Modal, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutfitStore } from '../src/store';
import { CategoryDefinition } from '../src/types';

export default function MacroSettingsScreen() {
  const router = useRouter();
  const { categories, macroOrder, setMacroOrder, addCategory, removeCategory, clothes, assignItemToCategory, removeItemFromCategory } = useOutfitStore();

  const [newCatName, setNewCatName] = useState('');

  // State for item assignment modal
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...macroOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setMacroOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === macroOrder.length - 1) return;
    const newOrder = [...macroOrder];
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    setMacroOrder(newOrder);
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName('');
  };

  const handleRemoveCategory = (id: string, name: string) => {
    Alert.alert(
      'カテゴリーの削除',
      `「${name}」を削除しますか？\n(中の服はクローゼットに残ります)`,
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => removeCategory(id) }
      ]
    );
  };

  const toggleItemInCategory = (itemId: string, categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    if (category.itemIds.includes(itemId)) {
      removeItemFromCategory(itemId, categoryId);
    } else {
      assignItemToCategory(itemId, categoryId);
    }
  };

  return (
    <LinearGradient colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>カテゴリー・スワイプ設定</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#6D28D9" style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>
              スワイプする順序（マクロ）や、新しく「デート用」「宴会用」などのカテゴリーを作成し、服を振り分けることができます。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>新しいカテゴリーを作成</Text>
            <View style={styles.addCategoryRow}>
              <TextInput
                style={styles.input}
                placeholder="例: デート用、宴会用"
                placeholderTextColor="#9CA3AF"
                value={newCatName}
                onChangeText={setNewCatName}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                <Text style={styles.addButtonText}>追加</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>スワイプ順序・振り分け</Text>
            {macroOrder.map((catId, index) => {
              const category = categories.find(c => c.id === catId);
              if (!category) return null;

              return (
                <View key={catId} style={styles.macroRow}>
                  <View style={styles.macroLeft}>
                    <View style={styles.orderBadge}>
                      <Text style={styles.orderText}>{index + 1}</Text>
                    </View>
                    <View>
                      <Text style={styles.macroName}>{category.name}</Text>
                      <Text style={styles.macroSub}>服の数: {category.itemIds.length}</Text>
                    </View>
                  </View>

                  <View style={styles.macroRight}>
                    <TouchableOpacity style={styles.assignButton} onPress={() => setActiveCategoryId(catId)}>
                      <Ionicons name="shirt-outline" size={18} color="#111827" />
                      <Text style={styles.assignText}>服を選ぶ</Text>
                    </TouchableOpacity>

                    <View style={styles.arrowContainer}>
                      <TouchableOpacity onPress={() => moveUp(index)} disabled={index === 0}>
                        <Ionicons name="chevron-up" size={24} color={index === 0 ? "#D1D5DB" : "#111827"} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => moveDown(index)} disabled={index === macroOrder.length - 1}>
                        <Ionicons name="chevron-down" size={24} color={index === macroOrder.length - 1 ? "#D1D5DB" : "#111827"} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => handleRemoveCategory(catId, category.name)} style={{ marginLeft: 10 }}>
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <Modal visible={activeCategoryId !== null} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>服を振り分ける</Text>
                <TouchableOpacity onPress={() => setActiveCategoryId(null)} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={clothes}
                keyExtractor={item => item.id}
                numColumns={3}
                columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => {
                  const category = categories.find(c => c.id === activeCategoryId);
                  const isSelected = category?.itemIds.includes(item.id);

                  return (
                    <TouchableOpacity
                      style={[styles.gridItem, isSelected && styles.gridItemSelected]}
                      onPress={() => activeCategoryId && toggleItemInCategory(item.id, activeCategoryId)}
                    >
                      {item.imageUrl ? (
                        <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
                      ) : (
                        <View style={styles.gridPlaceholder}>
                          <Ionicons name="shirt-outline" size={24} color="#9CA3AF" />
                        </View>
                      )}
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  scrollArea: { padding: 20 },
  infoBox: { flexDirection: 'row', backgroundColor: '#EDE9FE', padding: 15, borderRadius: 12, marginBottom: 20, alignItems: 'center' },
  infoText: { flex: 1, color: '#4C1D95', fontSize: 13, fontWeight: '700', lineHeight: 20 },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 15 },
  addCategoryRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', fontWeight: '600' },
  addButton: { backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 12 },
  addButtonText: { color: 'white', fontWeight: '800', fontSize: 16 },

  macroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 15, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  macroLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  orderBadge: { width: 30, height: 30, backgroundColor: '#F3F4F6', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  orderText: { fontWeight: '800', color: '#4B5563' },
  macroName: { fontSize: 16, fontWeight: '800', color: '#111827' },
  macroSub: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '700' },
  macroRight: { flexDirection: 'row', alignItems: 'center' },

  assignButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 15 },
  assignText: { fontSize: 12, fontWeight: '800', color: '#111827', marginLeft: 4 },

  arrowContainer: { alignItems: 'center', justifyContent: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', backgroundColor: '#FAFBFC', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  closeButton: { padding: 8, backgroundColor: '#E5E7EB', borderRadius: 12 },

  gridItem: { flex: 1, aspectRatio: 1, borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  gridItemSelected: { borderColor: '#8B5CF6' },
  gridImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  gridPlaceholder: { width: '100%', height: '100%', backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  checkBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#8B5CF6', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }
});
