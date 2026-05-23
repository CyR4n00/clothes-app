import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaywallScreen() {
  const router = useRouter();
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e: any) {
        console.warn('RevenueCat設定エラー:', e.message);
      }
    };

    fetchOfferings();
  }, []);

  const handlePurchase = async (pkg: PurchasesPackage) => {
    setIsPurchasing(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      if (typeof customerInfo.entitlements.active['Premium'] !== "undefined") {
        Alert.alert('購入完了', 'プレミアムプランの登録が完了しました！');
        router.back();
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('エラー', e.message);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setIsPurchasing(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active['Premium'] !== "undefined") {
        Alert.alert('復元完了', 'プレミアムプランを復元しました。');
        router.back();
      } else {
        Alert.alert('復元失敗', '有効なサブスクリプションが見つかりませんでした。');
      }
    } catch (e: any) {
      Alert.alert('エラー', e.message);
    } finally {
      setIsPurchasing(false);
    }
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
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.identifier}
              style={styles.packageCard}
              onPress={() => handlePurchase(pkg)}
              disabled={isPurchasing}
            >
              <Text style={styles.packageName}>{pkg.product.title}</Text>
              <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>プランを読み込み中、または設定が完了していません。</Text>
        )}
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
