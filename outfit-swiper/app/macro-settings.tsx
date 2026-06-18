import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOutfitStore } from '../src/store';
import { GridBackground } from '../components/GridBackground';

export default function MacroSettingsScreen() {
  const router = useRouter();
  const { macroOrder, setMacroOrder } = useOutfitStore();

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

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="戻る"
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MACRO SEQUENCE</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#111827" style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>
              服をスワイプして決めていく際の「部位の順序（マクロ）」を変更できます。
            </Text>
          </View>

          <View style={styles.section}>
            {macroOrder.map((part, index) => (
              <View key={part} style={styles.macroRow}>
                <View style={styles.macroLeft}>
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.macroName}>{part}</Text>
                </View>

                <View style={styles.macroRight}>
                  <View style={styles.arrowContainer}>
                    <TouchableOpacity
                      onPress={() => moveUp(index)}
                      disabled={index === 0}
                      style={styles.arrowBtn}
                      accessibilityRole="button"
                      accessibilityLabel="上に移動"
                      accessibilityState={{ disabled: index === 0 }}
                    >
                      <Ionicons name="chevron-up" size={24} color={index === 0 ? "#D1D5DB" : "#111827"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => moveDown(index)}
                      disabled={index === macroOrder.length - 1}
                      style={styles.arrowBtn}
                      accessibilityRole="button"
                      accessibilityLabel="下に移動"
                      accessibilityState={{ disabled: index === macroOrder.length - 1 }}
                    >
                      <Ionicons name="chevron-down" size={24} color={index === macroOrder.length - 1 ? "#D1D5DB" : "#111827"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 2, borderColor: '#111827' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#111827' },
  scrollArea: { padding: 20 },
  infoBox: { flexDirection: 'row', backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, marginBottom: 20, alignItems: 'center', borderWidth: 2, borderColor: '#111827' },
  infoText: { flex: 1, color: '#111827', fontSize: 13, fontWeight: '800', lineHeight: 20 },

  section: { marginBottom: 30 },
  macroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 16, marginBottom: 10, borderWidth: 2, borderColor: '#111827' },
  macroLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  orderBadge: { width: 30, height: 30, backgroundColor: '#111827', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  orderText: { fontWeight: '900', color: '#FFFFFF' },
  macroName: { fontSize: 18, fontWeight: '900', color: '#111827' },
  macroRight: { flexDirection: 'row', alignItems: 'center' },
  arrowContainer: { flexDirection: 'row', gap: 10 },
  arrowBtn: { padding: 5, backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' }
});
