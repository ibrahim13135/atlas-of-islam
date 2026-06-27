import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, PanResponder, Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAudio } from '../contexts/AudioContext';
import { RECITERS } from '../services/api';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);
  var pad = s < 10 ? '0' : '';
  return m + ':' + pad + s;
}

export default function PlayerBar() {
  var _useAudio = useAudio();
  var player = _useAudio.player;
  var status = _useAudio.status;
  var reciter = _useAudio.reciter;
  var currentSurah = _useAudio.currentSurah;
  var currentAyah = _useAudio.currentAyah;
  var isPlaying = _useAudio.isPlaying;
  var setReciter = _useAudio.setReciter;
  var playSurah = _useAudio.playSurah;
  var togglePlayPause = _useAudio.togglePlayPause;
  var stop = _useAudio.stop;
  var seekTo = _useAudio.seekTo;

  var [showReciterModal, setShowReciterModal] = useState(false);
  var seekWidthRef = useRef(0);

  var progress = status && status.duration > 0
    ? (status.currentTime / status.duration) * 100
    : 0;

  var handleSeek = useCallback(function(locationX) {
    if (status && status.duration && seekWidthRef.current > 0) {
      var pct = Math.max(0, Math.min(1, locationX / seekWidthRef.current));
      seekTo(status.duration * pct);
    }
  }, [status, seekTo]);

  var panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: function() { return true; },
    onMoveShouldSetPanResponder: function() { return true; },
    onPanResponderGrant: function(e) { handleSeek(e.nativeEvent.locationX); },
    onPanResponderMove: function(e) { handleSeek(e.nativeEvent.locationX); },
  })).current;

  var handleReciterSelect = function(r) {
    setReciter(r);
    setShowReciterModal(false);
    if (currentSurah) playSurah(currentSurah.number);
  };

  if (!status && !reciter) return null;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.infoRow}>
          <Pressable onPress={function() { setShowReciterModal(true); }} style={styles.reciterBtn}>
            <Text style={styles.reciterText} numberOfLines={1}>
              {reciter ? reciter.name : 'اختر القارئ'}
            </Text>
          </Pressable>
          <Text style={styles.statusIcon}>{isPlaying ? '▶' : '⏸'}</Text>
        </View>

        <View style={styles.seekRow}>
          <Text style={styles.timeText}>{formatTime(status ? status.currentTime : 0)}</Text>
          <View
            style={styles.seekContainer}
            onLayout={function(e) { seekWidthRef.current = e.nativeEvent.layout.width; }}
            {...panResponder.panHandlers}
          >
            <View style={styles.seekTrack}>
              <View style={[styles.seekFill, { width: progress + '%' }]} />
            </View>
          </View>
          <Text style={styles.timeText}>{formatTime(status ? status.duration : 0)}</Text>
        </View>

        <View style={styles.controlRow}>
          <Pressable onPress={togglePlayPause} style={styles.playBtn}>
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={showReciterModal}
        transparent
        animationType="slide"
        onRequestClose={function() { setShowReciterModal(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            <Text style={styles.modalTitle}>اختر القارئ</Text>
            <Text style={styles.modalSub}>Choose a Reciter</Text>

            <ScrollView style={styles.modalList}>
              {RECITERS.map(function(r) {
                var isActive = reciter && reciter.id === r.id;
                return (
                  <Pressable
                    key={r.id}
                    style={[
                      styles.reciterItem,
                      isActive && styles.reciterItemActive,
                    ]}
                    onPress={function() { handleReciterSelect(r); }}
                  >
                    <View>
                      <Text style={styles.reciterItemName}>{r.name}</Text>
                      <Text style={styles.reciterItemEnglish}>{r.englishName}</Text>
                    </View>
                    <View style={styles.reciterItemRight}>
                      <View style={styles.styleBadge}>
                        <Text style={styles.styleText}>{r.style}</Text>
                      </View>
                      {isActive && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable style={styles.modalClose} onPress={function() { setShowReciterModal(false); }}>
              <Text style={styles.modalCloseText}>إغلاق</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.playerBg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,175,55,0.15)',
    paddingBottom: Platform.OS === 'web' ? 8 : 20,
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reciterBtn: {
    flex: 1,
  },
  reciterText: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.textPrimary,
    fontSize: 12,
  },
  statusIcon: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginLeft: 8,
  },
  seekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    minWidth: 28,
    textAlign: 'center',
  },
  seekContainer: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  seekTrack: {
    height: 5,
    backgroundColor: Colors.dark.progressTrack,
    borderRadius: 3,
    overflow: 'hidden',
  },
  seekFill: {
    height: '100%',
    backgroundColor: Colors.dark.gold,
    borderRadius: 3,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.dark.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
  },

  /* Reciter modal */
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
  },
  modalSub: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalList: {
    paddingHorizontal: 16,
  },
  reciterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    borderRadius: 8,
    marginBottom: 4,
  },
  reciterItemActive: {
    backgroundColor: Colors.dark.reciterBg,
    borderWidth: 1,
    borderColor: Colors.dark.gold,
  },
  reciterItemName: {
    fontFamily: 'Amiri-Bold',
    color: Colors.dark.textPrimary,
    fontSize: 14,
  },
  reciterItemEnglish: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 1,
  },
  reciterItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  styleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: Colors.dark.surfaceHighlight,
  },
  styleText: {
    fontFamily: 'Kufam-Regular',
    color: Colors.dark.gold,
    fontSize: 10,
  },
  checkmark: {
    color: Colors.dark.success,
    fontSize: 14,
    fontWeight: 'bold',
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
