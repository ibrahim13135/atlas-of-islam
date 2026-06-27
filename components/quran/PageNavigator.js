import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/Colors';
import { SURAH_LIST } from '../../services/quranApi';

export default function PageNavigator({ currentPage, onPageChange, currentSurahName }) {
  var [showSurahPicker, setShowSurahPicker] = useState(false);
  var [searchQuery, setSearchQuery] = useState('');

  function goNext() {
    if (currentPage < 604) onPageChange(currentPage + 1);
  }

  function goPrev() {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }

  function handleSurahSelect(surahNumber) {
    var surah = SURAH_LIST.find(function(s) { return s.number === surahNumber; });
    var targetPage = surah && surah.pages ? surah.pages[0] : Math.max(1, Math.min((surahNumber - 1) * 5 + 1, 604));
    onPageChange(targetPage);
    setShowSurahPicker(false);
    setSearchQuery('');
  }

  var filteredSurahs = SURAH_LIST.filter(function(s) {
    return s.name.includes(searchQuery) || (s.englishName && s.englishName.toLowerCase().includes(searchQuery.toLowerCase())) || String(s.number).includes(searchQuery);
  });

  var cleanSurahName = currentSurahName
    ? currentSurahName.replace('سورة ', '')
    : '';

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable
            onPress={goPrev}
            style={[
              styles.button,
              currentPage === 1 && styles.buttonDisabled,
            ]}
            disabled={currentPage === 1}
          >
            <Text style={styles.buttonText}>← السابق</Text>
          </Pressable>

          <Pressable
            onPress={function() { setShowSurahPicker(true); }}
            style={styles.surahButton}
          >
            <Text style={styles.surahButtonText} numberOfLines={1}>
              {cleanSurahName || 'السورة'}
            </Text>
          </Pressable>

          <Pressable
            onPress={goNext}
            style={[
              styles.button,
              currentPage === 604 && styles.buttonDisabled,
            ]}
            disabled={currentPage === 604}
          >
            <Text style={styles.buttonText}>التالي →</Text>
          </Pressable>
        </View>

        <View style={styles.pageInfo}>
          <Text style={styles.pageText}>{currentPage}</Text>
          <Text style={styles.pageLabel}>من ٦٠٤</Text>
        </View>
      </View>

      <Modal
        visible={showSurahPicker}
        transparent
        animationType="slide"
        onRequestClose={function() { setShowSurahPicker(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            <Text style={styles.modalTitle}>اختر سورة</Text>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="البحث..."
                placeholderTextColor={Colors.dark.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                textAlign="right"
                autoCorrect={false}
              />
            </View>

            <ScrollView style={styles.modalList}>
              {filteredSurahs.length === 0 ? (
                <View style={styles.emptySearch}>
                  <Text style={styles.emptySearchText}>لا توجد نتائج</Text>
                </View>
              ) : null}
              {filteredSurahs.map(function(surah) {
                return (
                  <Pressable
                    key={surah.number}
                    style={[
                      styles.modalItem,
                    ]}
                    onPress={function() { handleSurahSelect(surah.number); }}
                  >
                    <View style={[styles.modalItemNumber, {
                      backgroundColor: surah.type === 'مكية' ? Colors.dark.makki : Colors.dark.madani,
                    }]}>
                      <Text style={styles.modalItemNumberText}>{surah.number}</Text>
                    </View>
                    <View style={styles.modalItemText}>
                      <Text style={styles.modalItemName}>{surah.name}</Text>
                      <Text style={styles.modalItemMeta}>
                        {surah.type} · {surah.verses} آيات
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable
              style={styles.modalClose}
              onPress={function() { setShowSurahPicker(false); }}
            >
              <Text style={styles.modalCloseText}>إغلاق</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.dark.surfaceHighlight,
    minWidth: 72,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 12,
  },
  surahButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.dark.reciterBg,
    borderWidth: 1,
    borderColor: Colors.dark.gold,
    alignItems: 'center',
  },
  surahButtonText: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.gold,
    fontSize: 15,
  },
  pageInfo: {
    alignItems: 'center',
    marginTop: 4,
  },
  pageText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textPrimary,
    fontSize: 16,
  },
  pageLabel: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    fontFamily: 'Kufam-Regular',
    backgroundColor: Colors.dark.surfaceHighlight,
    color: Colors.dark.textPrimary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  emptySearch: {
    padding: 24,
    alignItems: 'center',
  },
  emptySearchText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.dark.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dark.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalList: {
    paddingHorizontal: 16,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    borderRadius: 8,
  },
  modalItemNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalItemNumberText: {
    fontFamily: 'Kufam-Regular',
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  modalItemText: {
    flex: 1,
  },
  modalItemName: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.textPrimary,
    fontSize: 15,
  },
  modalItemMeta: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  modalClose: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    marginTop: 8,
  },
  modalCloseText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 14,
  },
});
