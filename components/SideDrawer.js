import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions, Platform, ScrollView } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Colors } from '../constants/Colors';

var DRAWER_WIDTH = Dimensions.get('window').width * 0.78;
var SCREEN_WIDTH = Dimensions.get('window').width;

var MENU_ITEMS = [
  { label: 'المصحف الشريف', route: '/quran?page=1', icon: '📖' },
  { label: 'التلاوات والقراء', route: '/quran?page=1', icon: '🎙️' },
  { label: 'التفسير', route: '/', icon: '📝' },
  { label: 'السيرة النبوية', route: '/', icon: '🕌' },
  { label: 'الحديث الشريف', route: '/', icon: '📚' },
  { label: 'الأدعية', route: '/', icon: '🤲' },
  { label: 'الإعدادات', route: '/', icon: '⚙️' },
];

export default function SideDrawer({ visible, onClose }) {
  var slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  var pathname = usePathname();

  useEffect(function() {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [visible, slideAnim]);

  function handleNavigate(route) {
    onClose();
    setTimeout(function() { router.push(route); }, 320);
  }

  function isActiveRoute(route) {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.startsWith(route.split('?')[0])) return true;
    return false;
  }

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={onClose} style={styles.overlayPress} />
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
          <Text style={styles.headerIcon}>﷽</Text>
          <Text style={styles.headerTitle}>Atlas of Islam</Text>
          <Text style={styles.headerSub}>الـمــوسـوعـة الإسـلامـيـة</Text>
        </View>

        <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
          {MENU_ITEMS.map(function(item, index) {
            var isActive = isActiveRoute(item.route);
            return (
              <Pressable
                key={index}
                style={[
                  styles.menuItem,
                  isActive && styles.menuItemActive,
                ]}
                onPress={function() { handleNavigate(item.route); }}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  overlayPress: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: Colors.dark.surface,
    borderLeftWidth: 1,
    borderLeftColor: Colors.dark.border,
    zIndex: 10000,
    elevation: 10000,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
  },
  headerIcon: {
    fontSize: 32,
    color: Colors.dark.gold,
    marginBottom: 8,
    opacity: 0.7,
  },
  headerTitle: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 18,
    letterSpacing: 1,
  },
  headerSub: {
    fontFamily: 'Amiri-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  menuScroll: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  menuItemActive: {
    backgroundColor: Colors.dark.reciterBg,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 14,
  },
  menuLabel: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textPrimary,
    fontSize: 14,
    flex: 1,
  },
  menuLabelActive: {
    color: Colors.dark.gold,
    fontFamily: 'Amiri-Bold',
  },
});
