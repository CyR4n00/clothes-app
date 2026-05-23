import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="diamond" size={60} color="#FFD700" />
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

      {isPurchasing && <ActivityIndicator size="large" color="#FF2D55" style={{ marginTop: 20 }} />}

      <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
        <Text style={styles.restoreText}>購入を復元する</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  closeButton: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  header: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, color: '#343A40' },
  subtitle: { fontSize: 16, color: '#6C757D', marginTop: 10, textAlign: 'center' },
  packagesContainer: { marginTop: 40, paddingHorizontal: 20 },
  packageCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FF2D55'
  },
  packageName: { fontSize: 18, fontWeight: '600', color: '#343A40' },
  packagePrice: { fontSize: 18, fontWeight: 'bold', color: '#FF2D55' },
  loadingText: { textAlign: 'center', color: '#868E96' },
  restoreButton: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' },
  restoreText: { color: '#868E96', fontSize: 14, textDecorationLine: 'underline' }
});
