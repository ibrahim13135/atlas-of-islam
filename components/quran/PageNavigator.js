import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PageNavigator({ currentPage, onPageChange }) {
  const goNext = () => {
    if (currentPage < 604) onPageChange(currentPage + 1);
  };
  
  const goPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  
  return (
    <View style={styles.container}>
      <Pressable 
        onPress={goPrev}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          currentPage === 1 && styles.buttonDisabled
        ]}
        disabled={currentPage === 1}
      >
        <Text style={styles.buttonText}>السابق</Text>
      </Pressable>
      
      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>{currentPage}</Text>
        <Text style={styles.pageLabel}>من ٦٠٤</Text>
      </View>
      
      <Pressable 
        onPress={goNext}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          currentPage === 604 && styles.buttonDisabled
        ]}
        disabled={currentPage === 604}
      >
        <Text style={styles.buttonText}>التالي</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.dark.surfaceHighlight,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 14,
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textPrimary,
    fontSize: 20,
  },
  pageLabel: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
});