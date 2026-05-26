import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function PaywallScreen() {
  const router = useRouter();
  const [isPurchasing, setIsPurchasing] = useState(false);

  // モックのプランデータ（WebやExpo Goで表示確認するため）
  const mockPackages = [
    { identifier: 'monthly', title: '月額プラン', priceString: '¥500' },
    { identifier: 'yearly', title: '年間プラン', priceString: '¥5,000' }
  ];

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      if (Platform.OS === 'web') {
        window.alert('購入完了: プレミアムプランの登録が完了しました！（モック）');
      } else {
        Alert.alert('購入完了', 'プレミアムプランの登録が完了しました！（モック）');
      }
      router.back();
    }, 1000);
  };

  const handleRestore = async () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      if (Platform.OS === 'web') {
        window.alert('復元完了: プレミアムプランを復元しました。（モック）');
      } else {
        Alert.alert('復元完了', 'プレミアムプランを復元しました。（モック）');
      }
      router.back();
    }, 1000);
  };

  return (
    <LinearGradient colors={['#E5D9F2', '#F5EFFF', '#FFFFFF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#4C1D95" />
        </TouchableOpacity>

        <View style={styles.glassCard}>
          <View style={styles.header}>
            <Ionicons name="diamond" size={60} color="#8B5CF6" />
            <Text style={styles.title}>プレミアムプラン</Text>
            <Text style={styles.subtitle}>AIがあなたにぴったりの服を提案！</Text>
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

          {isPurchasing && <ActivityIndicator size="large" color="#8B5CF6" style={{ marginTop: 20 }} />}
        </View>

        <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
          <Text style={styles.restoreText}>購入を復元する</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10 },
  glassCard: {
    marginHorizontal: 20,
    marginTop: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: { alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, color: '#4C1D95' },
  subtitle: { fontSize: 16, color: '#6D28D9', marginTop: 10, textAlign: 'center', fontWeight: 'bold' },
  packagesContainer: { marginTop: 40 },
  packageCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#8B5CF6'
  },
  packageName: { fontSize: 18, fontWeight: 'bold', color: '#4C1D95' },
  packagePrice: { fontSize: 18, fontWeight: 'bold', color: '#8B5CF6' },
  restoreButton: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' },
  restoreText: { color: '#8B5CF6', fontSize: 16, fontWeight: 'bold' }
});
