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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#39FF14" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MACRO SEQUENCE</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#00FFFF" style={{ marginRight: 8 }} />
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
                    <TouchableOpacity onPress={() => moveUp(index)} disabled={index === 0} style={styles.arrowBtn}>
                      <Ionicons name="chevron-up" size={24} color={index === 0 ? "#444" : "#39FF14"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => moveDown(index)} disabled={index === macroOrder.length - 1} style={styles.arrowBtn}>
                      <Ionicons name="chevron-down" size={24} color={index === macroOrder.length - 1 ? "#444" : "#39FF14"} />
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
  container: { flex: 1, backgroundColor: '#050505' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, backgroundColor: 'rgba(57, 255, 20, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#39FF14' },
  headerTitle: { fontSize: 20, fontFamily: 'Orbitron-Bold', color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  scrollArea: { padding: 20 },
  infoBox: { flexDirection: 'row', backgroundColor: 'rgba(0, 255, 255, 0.1)', padding: 15, borderRadius: 12, marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: '#00FFFF' },
  infoText: { flex: 1, color: '#00FFFF', fontSize: 13, fontFamily: 'DotGothic16-Regular', lineHeight: 20 },

  section: { marginBottom: 30 },
  macroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111', padding: 15, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  macroLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  orderBadge: { width: 30, height: 30, backgroundColor: 'rgba(57, 255, 20, 0.2)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#39FF14' },
  orderText: { fontFamily: 'Orbitron-Bold', color: '#39FF14' },
  macroName: { fontSize: 18, fontFamily: 'Orbitron-Bold', color: '#FFF' },
  macroRight: { flexDirection: 'row', alignItems: 'center' },
  arrowContainer: { flexDirection: 'row', gap: 10 },
  arrowBtn: { padding: 5, backgroundColor: '#222', borderRadius: 8, borderWidth: 1, borderColor: '#333' }
});
