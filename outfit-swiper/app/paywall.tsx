import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GridBackground } from '../components/GridBackground';

export default function PaywallScreen() {
  const router = useRouter();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const mockPackages = [
    { identifier: 'monthly', title: 'MONTHLY', priceString: '¥500' },
    { identifier: 'yearly', title: 'YEARLY', priceString: '¥5,000' }
  ];

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      if (Platform.OS === 'web') {
        window.alert('SYSTEM UPDATE: Premium features unlocked.');
      } else {
        Alert.alert('SYSTEM UPDATE', 'Premium features unlocked.');
      }
      router.back();
    }, 1000);
  };

  const handleRestore = async () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      if (Platform.OS === 'web') {
        window.alert('SYSTEM RESTORE: Purchases recovered.');
      } else {
        Alert.alert('SYSTEM RESTORE', 'Purchases recovered.');
      }
      router.back();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <GridBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="閉じる">
          <Ionicons name="close" size={28} color="#111827" />
        </TouchableOpacity>

        <View style={styles.glassCard}>
          <View style={styles.header}>
            <Ionicons name="diamond" size={60} color="#111827" />
            <Text style={styles.title}>PREMIUM ACCESS</Text>
            <Text style={styles.subtitle}>Unlock AI Outfit Suggestions</Text>
          </View>

          <View style={styles.packagesContainer}>
            {mockPackages.map((pkg) => (
              <TouchableOpacity
                key={pkg.identifier}
                style={styles.packageCard}
                onPress={() => handlePurchase()}
                disabled={isPurchasing}
              >
                <Text style={styles.packageName}>{pkg.title}</Text>
                <Text style={styles.packagePrice}>{pkg.priceString}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {isPurchasing && <ActivityIndicator size="large" color="#111827" style={{ marginTop: 20 }} />}
        </View>

        <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
          <Text style={styles.restoreText}>RESTORE PURCHASES</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10, backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 2, borderColor: '#111827' },
  glassCard: {
    marginHorizontal: 20,
    marginTop: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    borderWidth: 2,
    borderColor: '#111827',
    elevation: 10,
  },
  header: { alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: '900', marginTop: 20, color: '#111827' },
  subtitle: { fontSize: 14, fontWeight: '700', color: '#6B7280', marginTop: 10, textAlign: 'center' },
  packagesContainer: { marginTop: 40 },
  packageCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB'
  },
  packageName: { fontSize: 18, fontWeight: '900', color: '#111827' },
  packagePrice: { fontSize: 18, fontWeight: '900', color: '#111827' },
  restoreButton: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' },
  restoreText: { color: '#6B7280', fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' }
});
