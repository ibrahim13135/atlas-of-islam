import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';

function AyahMarker({ number }) {
  return (
    <View style={styles.ayahMarker}>
      <Text style={styles.ayahNumber}>﴿{number}﴾</Text>
    </View>
  );
}

function QuranWord({ word, onPress }) {
  const getWordColor = () => {
    switch (word.tajweed_rule) {
      case 'idgham': return Colors.dark.tajweed.idgham;
      case 'ikhfa': return Colors.dark.tajweed.ikhfa;
      case 'qalqala': return Colors.dark.tajweed.qalqala;
      case 'iqlab': return Colors.dark.tajweed.iqlab;
      case 'ghunna': return Colors.dark.tajweed.ghunna;
      default: return Colors.dark.textArabic;
    }
  };
  
  return (
    <Pressable 
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.(word);
      }}
      style={styles.wordContainer}
    >
      <Text style={[styles.word, { color: getWordColor() }]}>
        {word.text}
        {word.waqf_mark ? (
          <Text style={styles.waqfMark}>{word.waqf_mark}</Text>
        ) : null}
      </Text>
    </Pressable>
  );
}

function Verse({ verse, onVersePress, isSelected }) {
  return (
    <Pressable 
      onPress={() => onVersePress?.(verse)}
      style={[
        styles.verseContainer,
        isSelected && styles.verseSelected,
        verse.sajda && styles.verseSajda
      ]}
    >
      <View style={styles.verseContent}>
        {verse.words.map((word) => (
          <QuranWord 
            key={word.id} 
            word={word} 
            onPress={(w) => console.log('Word:', w.text)}
          />
        ))}
        <AyahMarker number={verse.ayahNumber} />
      </View>
      {verse.sajda && (
        <View style={styles.sajdaBadge}>
          <Text style={styles.sajdaText}>سجدة</Text>
        </View>
      )}
    </Pressable>
  );
}

function Bismillah() {
  return (
    <View style={styles.bismillahContainer}>
      <Text style={styles.bismillahText}>
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </Text>
      <View style={styles.bismillahLine} />
    </View>
  );
}

function SurahHeader({ surahName, preBasmala }) {
  return (
    <View style={styles.surahHeader}>
      <View style={styles.surahHeaderContent}>
        <Text style={styles.surahName}>{surahName}</Text>
        <View style={styles.surahDecoration}>
          <View style={styles.decorationLine} />
          <Text style={styles.surahIcon}>۞</Text>
          <View style={styles.decorationLine} />
        </View>
      </View>
      {preBasmala && <Bismillah />}
    </View>
  );
}

export default function QuranPage({ pageData, pageNumber, onVersePress, selectedVerse }) {
  const verses = useMemo(() => {
    const parsed = [];
    Object.entries(pageData).forEach(([surahName, surahData]) => {
      Object.entries(surahData.ayat).forEach(([ayahNum, ayahData]) => {
        parsed.push({
          surahName,
          surahInfo: {
            name: surahData.name,
            preBasmala: surahData.pre_basmala,
          },
          ayahNumber: parseInt(ayahNum),
          sajda: ayahData.sajda,
          sajdaType: ayahData.sajda_type,
          lineNumber: ayahData.line_number,
          words: ayahData.words,
          fullText: ayahData.words.map(w => w.text).join(' '),
        });
      });
    });
    return parsed;
  }, [pageData]);
  
  const groupedBySurah = useMemo(() => {
    const groups = [];
    let currentSurah = null;
    
    verses.forEach((verse) => {
      if (verse.surahName !== currentSurah) {
        currentSurah = verse.surahName;
        groups.push({
          type: 'header',
          surahName: verse.surahName,
          preBasmala: verse.surahInfo.preBasmala,
        });
      }
      groups.push({
        type: 'verse',
        data: verse,
      });
    });
    
    return groups;
  }, [verses]);
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageIndicator}>
        <Text style={styles.pageNumber}>صفحة {pageNumber}</Text>
        <View style={styles.pageLine} />
      </View>
      
      {groupedBySurah.map((item, index) => {
        if (item.type === 'header') {
          return (
            <SurahHeader 
              key={`header-${index}`}
              surahName={item.surahName}
              preBasmala={item.preBasmala}
            />
          );
        }
        
        return (
          <Verse
            key={`verse-${item.data.ayahNumber}-${index}`}
            verse={item.data}
            onVersePress={onVersePress}
            isSelected={selectedVerse?.ayahNumber === item.data.ayahNumber}
          />
        );
      })}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  pageIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pageNumber: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 14,
    marginBottom: 8,
  },
  pageLine: {
    width: 60,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.5,
  },
  surahHeader: {
    marginBottom: 24,
    marginTop: 16,
  },
  surahHeaderContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  surahName: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.gold,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
  },
  surahDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  decorationLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.3,
    marginHorizontal: 16,
  },
  surahIcon: {
    color: Colors.dark.gold,
    fontSize: 18,
    opacity: 0.6,
  },
  bismillahContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 8,
  },
  bismillahText: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.textArabic,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 40,
  },
  bismillahLine: {
    width: '40%',
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.3,
    marginTop: 16,
  },
  verseContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  verseSelected: {
    backgroundColor: Colors.dark.surfaceHighlight,
  },
  verseSajda: {
    borderRightWidth: 3,
    borderRightColor: Colors.dark.sajdaIndicator,
  },
  verseContent: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wordContainer: {
    marginHorizontal: 1,
    marginVertical: 2,
  },
  word: {
    fontFamily: 'Amiri-Regular',
    fontSize: 24,
    lineHeight: 42,
    color: Colors.dark.textArabic,
  },
  waqfMark: {
    fontSize: 18,
    color: Colors.dark.waqfMark,
  },
  ayahMarker: {
    marginHorizontal: 4,
    marginVertical: 4,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahNumber: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.ayahMarker,
    fontSize: 16,
    opacity: 0.8,
  },
  sajdaBadge: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  sajdaText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.sajdaIndicator,
    fontSize: 12,
    opacity: 0.7,
  },
  bottomPadding: {
    height: 40,
  },
});