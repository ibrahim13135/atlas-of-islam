import React, { createContext, useContext, useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { createAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import { getSurahAudioUrl } from '../services/api';

const AudioContext = createContext(null);

let globalPlayer = null;

function getOrCreatePlayer() {
  if (!globalPlayer) {
    globalPlayer = createAudioPlayer(null, { updateInterval: 500 });
  }
  return globalPlayer;
}

function silence(e) {}

export function AudioProvider({ children }) {
  var player = useMemo(function() { return getOrCreatePlayer(); }, []);
  var status = useAudioPlayerStatus(player);
  var reciterRef = useRef(null);
  var currentSurahRef = useRef(null);
  var currentAyahRef = useRef(null);
  var loadingRef = useRef(false);
  var cancelRef = useRef(null);
  var [, tick] = useState(0);

  useEffect(function() {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'mixWithOthers',
    }).catch(silence);

    return function() {
      if (cancelRef.current) clearTimeout(cancelRef.current);
    };
  }, []);

  var setReciter = useCallback(function(r) {
    reciterRef.current = r;
    tick(function(n) { return n + 1; });
  }, []);

  var setCurrentSurah = useCallback(function(s) {
    currentSurahRef.current = s;
    tick(function(n) { return n + 1; });
  }, []);

  var setCurrentAyah = useCallback(function(a) {
    currentAyahRef.current = a;
    tick(function(n) { return n + 1; });
  }, []);

  var safePlay = useCallback(function() {
    if (typeof player.play !== 'function') return;
    try {
      var p = player.play();
      if (p && typeof p.catch === 'function') p.catch(silence);
    } catch (e) { silence(e); }
  }, [player]);

  var safePause = useCallback(function() {
    if (typeof player.pause !== 'function') return;
    try { player.pause(); } catch (e) { silence(e); }
  }, [player]);

  var schedulePlay = useCallback(function() {
    if (cancelRef.current) clearTimeout(cancelRef.current);
    cancelRef.current = setTimeout(function() {
      loadingRef.current = false;
      cancelRef.current = null;
      safePlay();
    }, 200);
  }, [safePlay]);

  var playSurah = useCallback(function(surahNumber) {
    if (!surahNumber || loadingRef.current) return;
    loadingRef.current = true;
    var reciterId = reciterRef.current && reciterRef.current.id ? reciterRef.current.id : 'ar.alafasy';
    var url = getSurahAudioUrl(reciterId, surahNumber);
    if (typeof player.replace === 'function') player.replace(url);
    schedulePlay();
  }, [player, schedulePlay]);

  var playUrl = useCallback(function(url) {
    if (loadingRef.current) return;
    loadingRef.current = true;
    if (typeof player.replace === 'function') player.replace(url);
    schedulePlay();
  }, [player, schedulePlay]);

  var togglePlayPause = useCallback(function() {
    if (cancelRef.current) {
      clearTimeout(cancelRef.current);
      cancelRef.current = null;
      loadingRef.current = false;
    }
    if (status && status.playing) {
      safePause();
    } else {
      safePlay();
    }
  }, [status, safePlay, safePause]);

  var stop = useCallback(function() {
    if (cancelRef.current) {
      clearTimeout(cancelRef.current);
      cancelRef.current = null;
    }
    loadingRef.current = false;
    safePause();
    if (typeof player.seekTo === 'function') player.seekTo(0);
  }, [player, safePause]);

  var seekTo = useCallback(function(seconds) {
    if (typeof player.seekTo === 'function') player.seekTo(seconds);
  }, [player]);

  var isPlaying = status && status.playing ? true : false;

  var value = useMemo(function() {
    return {
      player: player,
      status: status,
      reciter: reciterRef.current,
      currentSurah: currentSurahRef.current,
      currentAyah: currentAyahRef.current,
      isPlaying: isPlaying,
      setReciter: setReciter,
      setCurrentSurah: setCurrentSurah,
      setCurrentAyah: setCurrentAyah,
      playSurah: playSurah,
      playUrl: playUrl,
      togglePlayPause: togglePlayPause,
      stop: stop,
      seekTo: seekTo,
    };
  }, [player, status, isPlaying, setReciter, setCurrentSurah, setCurrentAyah, playSurah, playUrl, togglePlayPause, stop, seekTo]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  var ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
