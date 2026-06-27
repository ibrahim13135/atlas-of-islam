# Atlas of Islam — الموسوعة الإسلامية

A comprehensive Islamic audio encyclopedia built with **Expo React Native**. Features a full Mushaf-style Quran reader with offline data, tajweed-colored text, reciter selection, global audio player, and surah navigation.

## Features

- **Quran Reader** — Continuous flowing RTL text, all 604 pages offline
- **Tajweed Coloring** — Words colored by tajweed rules (idgham, ikhfa, qalqala, ghunna)
- **8 Reciters** — Alafasy, Abdul Basit, Al-Husary, Al-Minshawi, Shaatree, Maher Muaiqly, Shuraym, Ajamy
- **Global Audio Player** — Persistent bottom bar with progress seek, play/pause, reciter selector
- **Surah Search** — Quick-find any surah by Arabic/English name or number
- **Offline First** — All 114 surahs embedded (~0.8 MB), zero runtime API calls
- **SideDrawer** — Animated navigation menu with quick links
- **Bilingual UI** — Arabic-first interface with English subtitles

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Expo SDK 56 |
| Routing | Expo Router v4 (file-based) |
| Audio | `expo-audio` (`createAudioPlayer`) |
| Fonts | Amiri (Quran), Kufam (UI) |
| Animations | React Native Animated + LinearGradient |
| Backend | Django REST (optional) |
| Audio CDN | [Al Quran Cloud](https://cdn.islamic.network) |

## Getting Started

```bash
npm install
npx expo start
```

### Web Build

```bash
npx expo export --platform web
```

## Project Structure

```
atlas-of-islam/
├── app/
│   ├── _layout.js          # Root: AudioProvider + PlayerBar
│   ├── index.js            # Homepage with hero + quick links
│   └── quran/index.js      # Quran reader screen
├── components/
│   ├── PlayerBar.js         # Global audio player bar
│   ├── SideDrawer.js        # Navigation drawer
│   └── quran/
│       ├── QuranPage.js     # Flowing RTL text page
│       ├── PageNavigator.js # Page nav + surah picker
│       └── QuranSearchBar.js# Surah search
├── contexts/
│   └── AudioContext.js      # Global audio state
├── services/
│   ├── api.js               # API constants + URL builders
│   ├── quranApi.js          # Offline-first page fetcher
│   └── quranOfflineData.js  # All 114 surahs offline
└── constants/
    └── Colors.js            # Dark theme palette
```

## Offline Data

The entire Quran text for all 604 pages is embedded in `services/quranOfflineData.js` (~0.8 MB). The app reads from this file first, falling back to the custom API or a placeholder generator. No external API calls are made at runtime.

## Audio

Audio is served from Al Quran Cloud CDN:
- Per-ayah: `https://cdn.islamic.network/quran/audio/128/{reciterId}/{surah}/{ayah}.mp3`
- Per-surah: `https://cdn.islamic.network/quran/audio-surah/128/{reciterId}/{surah}.mp3`

Errors (AbortError, NotSupportedError) are silently caught.

## Backend API (Optional)

The app can optionally fetch page data from a Django REST backend at `http://188.245.231.24:8000/api/quran/page/{page}/`. If unreachable, offline data is used automatically.

## License

MIT
