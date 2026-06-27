import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { SURAH_LIST } from '../../services/quranApi';

export default function QuranPage({
  pageData,
  pageNumber,
  onVersePress,
  selectedVerse,
  playingAyah,
}) {
  var surahList = useMemo(function() {
    return Object.entries(pageData || {}).map(function(entry) {
      var surahName = entry[0];
      var surahData = entry[1];
      var cleanName = surahName.replace('سورة ', '');
      var info = SURAH_LIST.find(function(s) { return s.name === cleanName; });
      var verses = Object.entries(surahData.ayat || {})
        .map(function(entry) {
          var num = entry[0];
          var ayah = entry[1];
          return {
            ayahNumber: parseInt(num),
            surahName: surahName,
            words: ayah.words || [],
            sajda: ayah.sajda || false,
            sajdaType: ayah.sajda_type || null,
          };
        })
        .sort(function(a, b) { return a.ayahNumber - b.ayahNumber; });

      return {
        surahName: surahName,
        surahInfo: info,
        preBasmala: surahData.pre_basmala,
        verses: verses,
      };
    });
  }, [pageData]);

  function handleVerseTap(verse) {
    Haptics.selectionAsync();
    if (onVersePress) onVersePress(verse);
  }

  function getWordColor(rule) {
    switch (rule) {
      case 'idgham': return Colors.dark.tajweed.idgham;
      case 'ikhfa': return Colors.dark.tajweed.ikhfa;
      case 'qalqala': return Colors.dark.tajweed.qalqala;
      case 'ikhf': return Colors.dark.tajweed.ikhf;
      case 'ghunna': return Colors.dark.tajweed.ghunna;
      default: return Colors.dark.textArabic;
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={styles.pageNumber}>صفحة {pageNumber}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: ((pageNumber / 604) * 100) + '%' }]} />
        </View>
      </View>

      {surahList.map(function(surah, sIdx) {
        var isMakki = surah.surahInfo && surah.surahInfo.type === 'مكية';
        var borderColor = isMakki ? Colors.dark.makki : Colors.dark.madani;

        return (
          <View key={surah.surahName} style={styles.surahBlock}>
            <View style={[styles.surahInfoBar, { borderColor: borderColor }]}>
              <View style={styles.surahInfoInner}>
                <View style={[styles.surahBadge, { backgroundColor: borderColor }]}>
                  <Text style={styles.surahBadgeText}>{surah.surahInfo ? surah.surahInfo.number : '?'}</Text>
                </View>
                <View>
                  <Text style={styles.surahInfoName}>
                    {surah.surahName}
                  </Text>
                  {surah.surahInfo ? (
                    <Text style={styles.surahInfoMeta}>
                      {surah.surahInfo.type} · {surah.surahInfo.verses} آيات
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={styles.surahDecoration}>
              <View style={styles.decorationLine} />
              <Text style={styles.decorationIcon}>۞</Text>
              <View style={styles.decorationLine} />
            </View>

            {surah.preBasmala && (
              <Text style={styles.basmala}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </Text>
            )}

            <Text style={styles.flowingText}>
              {surah.verses.map(function(verse, vIdx) {
                var isSel =
                  selectedVerse && selectedVerse.ayahNumber === verse.ayahNumber &&
                  selectedVerse && selectedVerse.surahName === verse.surahName;
                var isPlay =
                  playingAyah && playingAyah.ayahNumber === verse.ayahNumber &&
                  playingAyah && playingAyah.surahName === verse.surahName;

                var highlightStyle = null;
                if (isPlay) highlightStyle = styles.versePlaying;
                else if (isSel) highlightStyle = styles.verseSelected;

                return (
                  <Text
                    key={verse.ayahNumber}
                    style={[styles.verseSegment, highlightStyle]}
                    onPress={function() { handleVerseTap(verse); }}
                  >
                    {verse.sajda && <Text style={styles.sajdaMark}>۩ </Text>}
                    {verse.words.map(function(word, wIdx) {
                      return (
                        <Text key={word.id || wIdx} style={[styles.word, { color: getWordColor(word.tajweed_rule) }]}>
                          {word.text}
                          {word.waqf_mark ? (
                            <Text style={styles.waqf}>{word.waqf_mark}</Text>
                          ) : null}{' '}
                        </Text>
                      );
                    })}
                    <Text style={styles.ayahMarker}> ﴿{verse.ayahNumber}﴾ </Text>
                  </Text>
                );
              })}
            </Text>
          </View>
        );
      })}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  pageHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pageNumber: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 13,
    marginBottom: 6,
  },
  progressTrack: {
    width: '40%',
    height: 2,
    backgroundColor: Colors.dark.progressTrack,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.gold,
    borderRadius: 1,
  },
  surahBlock: {
    marginBottom: 20,
  },
  surahInfoBar: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: Colors.dark.reciterBg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  surahInfoInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  surahBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  surahBadgeText: {
    fontFamily: 'Kufam-Regular',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  surahInfoName: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.gold,
    fontSize: 18,
  },
  surahInfoMeta: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  surahDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  decorationLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.25,
    marginHorizontal: 12,
  },
  decorationIcon: {
    color: Colors.dark.gold,
    fontSize: 16,
    opacity: 0.5,
  },
  basmala: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.textArabic,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  flowingText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  verseSegment: {
    lineHeight: 48,
  },
  verseSelected: {
    backgroundColor: Colors.dark.surfaceHighlight,
    borderRadius: 4,
  },
  versePlaying: {
    backgroundColor: Colors.dark.reciterBg,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: Colors.dark.success,
    paddingLeft: 2,
  },
  word: {
    fontFamily: 'Amiri-Regular',
    fontSize: 24,
  },
  waqf: {
    fontSize: 18,
    color: Colors.dark.waqfMark,
  },
  ayahMarker: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.ayahMarker,
    fontSize: 14,
    opacity: 0.7,
  },
  sajdaMark: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.sajdaIndicator,
    fontSize: 24,
    opacity: 0.6,
  },
  bottomPadding: {
    height: 40,
  },
});
