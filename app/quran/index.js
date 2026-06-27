import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import QuranPage from '../../components/quran/QuranPage';
import PageNavigator from '../../components/quran/PageNavigator';
import QuranSearchBar from '../../components/quran/QuranSearchBar';
import { useAudio } from '../../contexts/AudioContext';
import { fetchQuranPage, SURAH_LIST } from '../../services/quranApi';
import { Colors } from '../../constants/Colors';

export default function QuranScreen() {
  var _params = useLocalSearchParams();
  var [page, setPage] = useState(parseInt(_params.page) || 1);
  var [pageData, setPageData] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var [selectedVerse, setSelectedVerse] = useState(null);
  var [searchVisible, setSearchVisible] = useState(false);

  var audio = useAudio();
  var reciter = audio.reciter;
  var currentAyah = audio.currentAyah;
  var setCurrentSurah = audio.setCurrentSurah;
  var setCurrentAyah = audio.setCurrentAyah;
  var playUrl = audio.playUrl;

  var loadPage = useCallback(async function(pageNum) {
    setLoading(true);
    setError(null);
    setSelectedVerse(null);

    try {
      var data = await fetchQuranPage(pageNum);
      if (data) {
        setPageData(data);
      } else {
        setError('تعذر تحميل البيانات. تأكد من الاتصال بالخادم.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function() {
    loadPage(page);
  }, [page, loadPage]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handleVersePress(verse) {
    setSelectedVerse(verse);
    setCurrentAyah(verse);

    var cleanSurahName = verse.surahName.replace('سورة ', '');
    var surahInfo = SURAH_LIST.find(function(s) { return s.name === cleanSurahName; });

    if (surahInfo) {
      setCurrentSurah(surahInfo);

      if (reciter) {
        var reciterId = reciter.id || 'ar.alafasy';
        var audioUrl = 'https://cdn.islamic.network/quran/audio/128/' + reciterId + '/' + surahInfo.number + '/' + verse.ayahNumber + '.mp3';
        playUrl(audioUrl);
      }
    }
  }

  var currentSurahName = pageData
    ? Object.keys(pageData)[0]
    : null;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.dark.gold} />
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>خطأ في تحميل الصفحة</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <Text style={styles.errorHint}>تأكد من تشغيل الخادم على {'\n'}http://188.245.231.24:8000</Text>
        <Text style={styles.retryText} onPress={function() { loadPage(page); }}>إعادة المحاولة</Text>
      </View>
    );
  }

  if (!pageData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>📖</Text>
        <Text style={styles.errorText}>لا توجد بيانات</Text>
        <Text style={styles.errorSubtext}>لم يتم العثور على بيانات للصفحة {page}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.searchToggle}
        onPress={function() { setSearchVisible(!searchVisible); }}
      >
        <Text style={styles.searchToggleText}>🔍</Text>
      </Pressable>
      {searchVisible && (
        <QuranSearchBar
          onSurahSelect={function(surahNumber) {
            var surah = SURAH_LIST.find(function(s) { return s.number === surahNumber; });
            var targetPage = surah && surah.pages ? surah.pages[0] : (Math.max(1, (surahNumber - 1) * 5 + 1));
            setPage(targetPage);
            setSearchVisible(false);
          }}
          onClose={function() { setSearchVisible(false); }}
        />
      )}
      <QuranPage
        pageData={pageData}
        pageNumber={page}
        onVersePress={handleVersePress}
        selectedVerse={selectedVerse}
        playingAyah={currentAyah}
      />
      <PageNavigator
        currentPage={page}
        onPageChange={handlePageChange}
        currentSurahName={currentSurahName}
      />
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  searchToggle: {
    position: 'absolute',
    top: 8,
    right: 12,
    zIndex: 100,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchToggleText: {
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 32,
  },
  loadingText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    marginTop: 16,
    fontSize: 14,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.sajdaIndicator,
    fontSize: 18,
    marginBottom: 8,
  },
  errorSubtext: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  errorHint: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 11,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.6,
  },
  retryText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 14,
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.gold,
    overflow: 'hidden',
  },
});
