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
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FF00FF" />
        </TouchableOpacity>

        <View style={styles.glassCard}>
          <View style={styles.header}>
            <Ionicons name="hardware-chip" size={60} color="#39FF14" />
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

          {isPurchasing && <ActivityIndicator size="large" color="#39FF14" style={{ marginTop: 20 }} />}
        </View>

        <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
          <Text style={styles.restoreText}>RESTORE PURCHASES</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10, backgroundColor: 'rgba(255,0,255,0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#FF00FF' },
  glassCard: {
    marginHorizontal: 20,
    marginTop: 100,
    backgroundColor: '#111',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#39FF14',
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  header: { alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontFamily: 'Orbitron-Bold', marginTop: 20, color: '#39FF14', textShadowColor: '#39FF14', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  subtitle: { fontSize: 14, fontFamily: 'DotGothic16-Regular', color: '#00FFFF', marginTop: 10, textAlign: 'center' },
  packagesContainer: { marginTop: 40 },
  packageCard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333'
  },
  packageName: { fontSize: 18, fontFamily: 'Orbitron-Bold', color: '#FFF' },
  packagePrice: { fontSize: 18, fontFamily: 'Orbitron-Bold', color: '#39FF14' },
  restoreButton: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' },
  restoreText: { color: '#888', fontSize: 14, fontFamily: 'Orbitron-Bold', textDecorationLine: 'underline' }
});
