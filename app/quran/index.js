import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import QuranPage from '../../components/quran/QuranPage';
import PageNavigator from '../../components/quran/PageNavigator';
import { fetchQuranPage } from '../../services/quranApi';
import { Colors } from '../../constants/Colors';

export default function QuranScreen() {
  const { page: pageParam } = useLocalSearchParams();
  const [page, setPage] = useState(parseInt(pageParam) || 1);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  
  const loadPage = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    setSelectedVerse(null);
    
    try {
      const data = await fetchQuranPage(pageNum);
      setPageData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handleVersePress = (verse) => {
    setSelectedVerse(verse);
    console.log('Selected verse:', verse);
  };
  
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.dark.gold} />
        <Text style={styles.loadingText}>جاري تحميل الصفحة...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>خطأ في تحميل الصفحة</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <QuranPage 
        pageData={pageData}
        pageNumber={page}
        onVersePress={handleVersePress}
        selectedVerse={selectedVerse}
      />
      <PageNavigator 
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  loadingText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    marginTop: 16,
    fontSize: 14,
  },
  errorText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.sajdaIndicator,
    fontSize: 18,
  },
  errorSubtext: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});