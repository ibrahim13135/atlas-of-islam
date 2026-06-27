import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { SURAH_LIST } from '../../services/quranApi';

export default function QuranSearchBar({ onSurahSelect, onClose }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? SURAH_LIST.filter((s) =>
        s.name.includes(query) ||
        s.englishName?.toLowerCase().includes(query.toLowerCase()) ||
        String(s.number).includes(query)
      ).slice(0, 20)
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="ابحث عن سورة..."
          placeholderTextColor={Colors.dark.textSecondary}
          value={query}
          onChangeText={setQuery}
          textAlign="right"
          autoFocus
          autoCorrect={false}
        />
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      </View>
      {filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.number)}
          style={styles.list}
          renderItem={({ item }) => {
            const isMakki = item.type === 'مكية';
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => onSurahSelect(item.number)}
              >
                <View style={[styles.badge, { backgroundColor: isMakki ? Colors.dark.makki : Colors.dark.madani }]}>
                  <Text style={styles.badgeText}>{item.number}</Text>
                </View>
                <View style={styles.itemText}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {item.type} · {item.verses} آيات · صفحة {item.pages?.[0] || '?'}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    zIndex: 200,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
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
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  closeBtnText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  list: {
    maxHeight: 300,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    borderRadius: 6,
  },
  itemPressed: {
    backgroundColor: Colors.dark.surfaceHighlight,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeText: {
    fontFamily: 'Kufam-Regular',
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.textPrimary,
    fontSize: 15,
  },
  itemMeta: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
});
