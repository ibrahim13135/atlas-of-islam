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
  const player = useMemo(() => getOrCreatePlayer(), []);
  const status = useAudioPlayerStatus(player);
  const reciterRef = useRef(null);
  const currentSurahRef = useRef(null);
  const currentAyahRef = useRef(null);
  const loadingRef = useRef(false);
  const [, tick] = useState(0);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'mixWithOthers',
    }).catch(silence);
  }, []);

  const setReciter = useCallback((r) => {
    reciterRef.current = r;
    tick((n) => n + 1);
  }, []);

  const setCurrentSurah = useCallback((s) => {
    currentSurahRef.current = s;
    tick((n) => n + 1);
  }, []);

  const setCurrentAyah = useCallback((a) => {
    currentAyahRef.current = a;
    tick((n) => n + 1);
  }, []);

  const safePlay = useCallback(() => {
    if (typeof player.play !== 'function') return;
    try {
      const p = player.play();
      if (p && typeof p.catch === 'function') p.catch(silence);
    } catch (e) { silence(e); }
  }, [player]);

  const safePause = useCallback(() => {
    if (typeof player.pause !== 'function') return;
    try { player.pause(); } catch (e) { silence(e); }
  }, [player]);

  const playSurah = useCallback((surahNumber) => {
    if (!surahNumber || loadingRef.current) return;
    loadingRef.current = true;
    const reciterId = reciterRef.current?.id || 'ar.alafasy';
    const url = getSurahAudioUrl(reciterId, surahNumber);
    if (typeof player.replace === 'function') player.replace(url);
    setTimeout(() => {
      safePlay();
      setTimeout(() => { loadingRef.current = false; }, 500);
    }, 200);
  }, [player, safePlay]);

  const playUrl = useCallback((url) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    if (typeof player.replace === 'function') player.replace(url);
    setTimeout(() => {
      safePlay();
      setTimeout(() => { loadingRef.current = false; }, 500);
    }, 200);
  }, [player, safePlay]);

  const togglePlayPause = useCallback(() => {
    if (status?.playing) {
      safePause();
    } else {
      safePlay();
    }
  }, [status, safePlay, safePause]);

  const stop = useCallback(() => {
    loadingRef.current = false;
    safePause();
    if (typeof player.seekTo === 'function') player.seekTo(0);
  }, [player, safePause]);

  const seekTo = useCallback((seconds) => {
    if (typeof player.seekTo === 'function') player.seekTo(seconds);
  }, [player]);

  const isPlaying = status?.playing || false;

  const value = useMemo(() => ({
    player,
    status,
    reciter: reciterRef.current,
    currentSurah: currentSurahRef.current,
    currentAyah: currentAyahRef.current,
    isPlaying,
    setReciter,
    setCurrentSurah,
    setCurrentAyah,
    playSurah,
    playUrl,
    togglePlayPause,
    stop,
    seekTo,
  }), [player, status, isPlaying, setReciter, setCurrentSurah, setCurrentAyah, playSurah, playUrl, togglePlayPause, stop, seekTo]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
