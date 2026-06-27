import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import SideDrawer from '../components/SideDrawer';

var QUICK_LINKS = [
  { label: 'المصحف الشريف', sub: 'Quran Reader', route: '/quran?page=1', icon: '📖', color: Colors.dark.gold },
  { label: 'التلاوات', sub: 'Recitations', route: '/quran?page=1', icon: '🎙️', color: Colors.dark.makki },
  { label: 'التفسير', sub: 'Tafsir', route: '/', icon: '📝', color: Colors.dark.madani },
  { label: 'السيرة', sub: 'Seerah', route: '/', icon: '🕌', color: Colors.dark.tajweed.idgham },
];

export default function Index() {
  var [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SideDrawer
        visible={drawerVisible}
        onClose={function() { setDrawerVisible(false); }}
      />

      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Atlas of Islam</Text>
          <Text style={styles.headerSub}>الـمــوسـوعـة الإسـلامـيـة</Text>
        </View>
        <Pressable
          onPress={function() { setDrawerVisible(true); }}
          style={styles.hamburger}
        >
          <Text style={styles.hamburgerText}>☰</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <LinearGradient
          colors={['#0f1a2e', Colors.dark.background]}
          style={styles.hero}
        >
          <Text style={styles.heroOrnament}>﷽</Text>
          <Text style={styles.heroText}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroSub}>موسوعة إسلامية صوتية شاملة</Text>
          <Text style={styles.heroVersion}>Comprehensive Islamic Audio Encyclopedia</Text>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>الأقسام</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.linksGrid}>
          {QUICK_LINKS.map(function(link, index) {
            return (
              <Pressable
                key={index}
                style={[
                  styles.linkCard,
                  { borderColor: link.color },
                ]}
                onPress={function() { router.push(link.route); }}
              >
                <Text style={styles.linkIcon}>{link.icon}</Text>
                <Text style={[styles.linkLabel, { color: link.color }]}>
                  {link.label}
                </Text>
                <Text style={styles.linkSub}>{link.sub}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footerSection}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>114 سورة · 6 قراء · تلاوات متنوعة</Text>
        </View>
      </ScrollView>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  hamburger: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerText: {
    color: Colors.dark.gold,
    fontSize: 22,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 16,
    letterSpacing: 1,
  },
  headerSub: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  heroOrnament: {
    fontSize: 48,
    color: Colors.dark.gold,
    marginBottom: 16,
    opacity: 0.8,
  },
  heroText: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.textArabic,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 44,
  },
  heroDivider: {
    width: 80,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.3,
    marginVertical: 16,
  },
  heroSub: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  heroVersion: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 4,
    opacity: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.2,
  },
  sectionTitle: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 13,
    marginHorizontal: 16,
    letterSpacing: 2,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  linkCard: {
    width: '46%',
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    minWidth: 140,
  },
  linkIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  linkLabel: {
    fontFamily: 'Amiri-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  linkSub: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 11,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footerLine: {
    width: 40,
    height: 1,
    backgroundColor: Colors.dark.gold,
    opacity: 0.2,
    marginBottom: 12,
  },
  footerText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    opacity: 0.5,
  },
});
