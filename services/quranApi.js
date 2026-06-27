var YOUR_API_BASE = 'http://188.245.231.24:8000/api';
var AUDIO_CDN = 'https://cdn.islamic.network/quran/audio';
var SURAH_AUDIO_CDN = 'https://cdn.islamic.network/quran/audio-surah';

export var RECITERS = [
  { id: 'ar.alafasy', name: 'مشاري راشد العفاسي', englishName: 'Mishary Alafasy', style: 'مرتل', photo: '' },
  { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد', englishName: 'Abdul Basit', style: 'مرتل', photo: '' },
  { id: 'ar.husary', name: 'محمود خليل الحصري', englishName: 'Al-Husary', style: 'مرتل', photo: '' },
  { id: 'ar.minshawi', name: 'محمد صديق المنشاوي', englishName: 'Al-Minshawi', style: 'مجود', photo: '' },
  { id: 'ar.shaatree', name: 'أبو بكر الشاطري', englishName: 'Shaatree', style: 'مرتل', photo: '' },
  { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي', englishName: 'Maher Muaiqly', style: 'مرتل', photo: '' },
  { id: 'ar.saoodshuraym', name: 'سعود الشريم', englishName: 'Saud Shuraym', style: 'مرتل', photo: '' },
  { id: 'ar.ahmedajamy', name: 'أحمد بن علي العجمي', englishName: 'Ahmed Ajamy', style: 'مرتل', photo: '' },
];

export var SURAH_LIST = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fatiha', verses: 7, type: 'مكية', pages: [1] },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', verses: 286, type: 'مدنية', pages: [2,49] },
  { number: 3, name: 'آل عمران', englishName: 'Aal-E-Imran', verses: 200, type: 'مدنية', pages: [50,76] },
  { number: 4, name: 'النساء', englishName: 'An-Nisa', verses: 176, type: 'مدنية', pages: [77,106] },
  { number: 5, name: 'المائدة', englishName: "Al-Ma'idah", verses: 120, type: 'مدنية', pages: [106,127] },
  { number: 6, name: 'الأنعام', englishName: "Al-An'am", verses: 165, type: 'مكية', pages: [128,150] },
  { number: 7, name: 'الأعراف', englishName: "Al-A'raf", verses: 206, type: 'مكية', pages: [151,176] },
  { number: 8, name: 'الأنفال', englishName: 'Al-Anfal', verses: 75, type: 'مدنية', pages: [177,186] },
  { number: 9, name: 'التوبة', englishName: 'At-Tawbah', verses: 129, type: 'مدنية', pages: [187,207] },
  { number: 10, name: 'يونس', englishName: 'Yunus', verses: 109, type: 'مكية', pages: [208,221] },
  { number: 11, name: 'هود', englishName: 'Hud', verses: 123, type: 'مكية', pages: [221,235] },
  { number: 12, name: 'يوسف', englishName: 'Yusuf', verses: 111, type: 'مكية', pages: [235,248] },
  { number: 13, name: 'الرعد', englishName: "Ar-Ra'd", verses: 43, type: 'مدنية', pages: [249,255] },
  { number: 14, name: 'إبراهيم', englishName: 'Ibrahim', verses: 52, type: 'مكية', pages: [255,261] },
  { number: 15, name: 'الحجر', englishName: 'Al-Hijr', verses: 99, type: 'مكية', pages: [262,267] },
  { number: 16, name: 'النحل', englishName: "An-Nahl", verses: 128, type: 'مكية', pages: [267,281] },
  { number: 17, name: 'الإسراء', englishName: "Al-Isra", verses: 111, type: 'مكية', pages: [282,293] },
  { number: 18, name: 'الكهف', englishName: "Al-Kahf", verses: 110, type: 'مكية', pages: [293,304] },
  { number: 19, name: 'مريم', englishName: "Maryam", verses: 98, type: 'مكية', pages: [305,312] },
  { number: 20, name: 'طه', englishName: "Ta-Ha", verses: 135, type: 'مكية', pages: [312,321] },
  { number: 21, name: 'الأنبياء', englishName: "Al-Anbiya", verses: 112, type: 'مكية', pages: [322,331] },
  { number: 22, name: 'الحج', englishName: "Al-Hajj", verses: 78, type: 'مدنية', pages: [332,341] },
  { number: 23, name: 'المؤمنون', englishName: "Al-Mu'minun", verses: 118, type: 'مكية', pages: [342,349] },
  { number: 24, name: 'النور', englishName: "An-Nur", verses: 64, type: 'مدنية', pages: [350,359] },
  { number: 25, name: 'الفرقان', englishName: "Al-Furqan", verses: 77, type: 'مكية', pages: [359,366] },
  { number: 26, name: 'الشعراء', englishName: "Ash-Shu'ara", verses: 227, type: 'مكية', pages: [367,376] },
  { number: 27, name: 'النمل', englishName: "An-Naml", verses: 93, type: 'مكية', pages: [377,385] },
  { number: 28, name: 'القصص', englishName: "Al-Qasas", verses: 88, type: 'مكية', pages: [385,396] },
  { number: 29, name: 'العنكبوت', englishName: "Al-Ankabut", verses: 69, type: 'مكية', pages: [396,404] },
  { number: 30, name: 'الروم', englishName: "Ar-Rum", verses: 60, type: 'مكية', pages: [404,410] },
  { number: 31, name: 'لقمان', englishName: "Luqman", verses: 34, type: 'مكية', pages: [411,414] },
  { number: 32, name: 'السجدة', englishName: "As-Sajda", verses: 30, type: 'مكية', pages: [415,417] },
  { number: 33, name: 'الأحزاب', englishName: "Al-Ahzab", verses: 73, type: 'مدنية', pages: [418,427] },
  { number: 34, name: 'سبأ', englishName: "Saba", verses: 54, type: 'مكية', pages: [428,434] },
  { number: 35, name: 'فاطر', englishName: "Fatir", verses: 45, type: 'مكية', pages: [434,440] },
  { number: 36, name: 'يس', englishName: "Ya-Sin", verses: 83, type: 'مكية', pages: [440,445] },
  { number: 37, name: 'الصافات', englishName: "As-Saffat", verses: 182, type: 'مكية', pages: [446,452] },
  { number: 38, name: 'ص', englishName: "Sad", verses: 88, type: 'مكية', pages: [453,458] },
  { number: 39, name: 'الزمر', englishName: "Az-Zumar", verses: 75, type: 'مكية', pages: [458,467] },
  { number: 40, name: 'غافر', englishName: "Ghafir", verses: 85, type: 'مكية', pages: [467,476] },
  { number: 41, name: 'فصلت', englishName: "Fussilat", verses: 54, type: 'مكية', pages: [477,482] },
  { number: 42, name: 'الشورى', englishName: "Ash-Shura", verses: 53, type: 'مكية', pages: [483,489] },
  { number: 43, name: 'الزخرف', englishName: "Az-Zukhruf", verses: 89, type: 'مكية', pages: [489,495] },
  { number: 44, name: 'الدخان', englishName: "Ad-Dukhan", verses: 59, type: 'مكية', pages: [496,498] },
  { number: 45, name: 'الجاثية', englishName: "Al-Jathiya", verses: 37, type: 'مكية', pages: [499,502] },
  { number: 46, name: 'الأحقاف', englishName: "Al-Ahqaf", verses: 35, type: 'مكية', pages: [502,506] },
  { number: 47, name: 'محمد', englishName: "Muhammad", verses: 38, type: 'مدنية', pages: [507,510] },
  { number: 48, name: 'الفتح', englishName: "Al-Fath", verses: 29, type: 'مدنية', pages: [511,515] },
  { number: 49, name: 'الحجرات', englishName: "Al-Hujurat", verses: 18, type: 'مدنية', pages: [515,517] },
  { number: 50, name: 'ق', englishName: "Qaf", verses: 45, type: 'مكية', pages: [518,520] },
  { number: 51, name: 'الذاريات', englishName: "Adh-Dhariyat", verses: 60, type: 'مكية', pages: [520,523] },
  { number: 52, name: 'الطور', englishName: "At-Tur", verses: 49, type: 'مكية', pages: [523,525] },
  { number: 53, name: 'النجم', englishName: "An-Najm", verses: 62, type: 'مكية', pages: [526,528] },
  { number: 54, name: 'القمر', englishName: "Al-Qamar", verses: 55, type: 'مكية', pages: [528,531] },
  { number: 55, name: 'الرحمن', englishName: "Ar-Rahman", verses: 78, type: 'مدنية', pages: [531,534] },
  { number: 56, name: 'الواقعة', englishName: "Al-Waqi'a", verses: 96, type: 'مكية', pages: [534,537] },
  { number: 57, name: 'الحديد', englishName: "Al-Hadid", verses: 29, type: 'مدنية', pages: [537,541] },
  { number: 58, name: 'المجادلة', englishName: "Al-Mujadila", verses: 22, type: 'مدنية', pages: [542,545] },
  { number: 59, name: 'الحشر', englishName: "Al-Hashr", verses: 24, type: 'مدنية', pages: [545,548] },
  { number: 60, name: 'الممتحنة', englishName: "Al-Mumtahanah", verses: 13, type: 'مدنية', pages: [549,551] },
  { number: 61, name: 'الصف', englishName: "As-Saff", verses: 14, type: 'مدنية', pages: [551,552] },
  { number: 62, name: 'الجمعة', englishName: "Al-Jumu'ah", verses: 11, type: 'مدنية', pages: [553,554] },
  { number: 63, name: 'المنافقون', englishName: "Al-Munafiqun", verses: 11, type: 'مدنية', pages: [554,555] },
  { number: 64, name: 'التغابن', englishName: "At-Taghabun", verses: 18, type: 'مدنية', pages: [556,557] },
  { number: 65, name: 'الطلاق', englishName: "At-Talaq", verses: 12, type: 'مدنية', pages: [558,559] },
  { number: 66, name: 'التحريم', englishName: "At-Tahrim", verses: 12, type: 'مدنية', pages: [560,561] },
  { number: 67, name: 'الملك', englishName: "Al-Mulk", verses: 30, type: 'مكية', pages: [562,564] },
  { number: 68, name: 'القلم', englishName: "Al-Qalam", verses: 52, type: 'مكية', pages: [564,566] },
  { number: 69, name: 'الحاقة', englishName: "Al-Haqqah", verses: 52, type: 'مكية', pages: [566,568] },
  { number: 70, name: 'المعارج', englishName: "Al-Ma'arij", verses: 44, type: 'مكية', pages: [568,570] },
  { number: 71, name: 'نوح', englishName: "Nuh", verses: 28, type: 'مكية', pages: [570,572] },
  { number: 72, name: 'الجن', englishName: "Al-Jinn", verses: 28, type: 'مكية', pages: [572,574] },
  { number: 73, name: 'المزمل', englishName: "Al-Muzzammil", verses: 20, type: 'مكية', pages: [574,575] },
  { number: 74, name: 'المدثر', englishName: "Al-Muddaththir", verses: 56, type: 'مكية', pages: [575,577] },
  { number: 75, name: 'القيامة', englishName: "Al-Qiyamah", verses: 40, type: 'مكية', pages: [577,578] },
  { number: 76, name: 'الإنسان', englishName: "Al-Insan", verses: 31, type: 'مدنية', pages: [578,580] },
  { number: 77, name: 'المرسلات', englishName: "Al-Mursalat", verses: 50, type: 'مكية', pages: [580,581] },
  { number: 78, name: 'النبأ', englishName: "An-Naba", verses: 40, type: 'مكية', pages: [582,583] },
  { number: 79, name: 'النازعات', englishName: "An-Nazi'at", verses: 46, type: 'مكية', pages: [583,584] },
  { number: 80, name: 'عبس', englishName: "'Abasa", verses: 42, type: 'مكية', pages: [585,585] },
  { number: 81, name: 'التكوير', englishName: "At-Takwir", verses: 29, type: 'مكية', pages: [586,586] },
  { number: 82, name: 'الإنفطار', englishName: "Al-Infitar", verses: 19, type: 'مكية', pages: [587,587] },
  { number: 83, name: 'المطففين', englishName: "Al-Mutaffifin", verses: 36, type: 'مكية', pages: [587,589] },
  { number: 84, name: 'الإنشقاق', englishName: "Al-Inshiqaq", verses: 25, type: 'مكية', pages: [589,590] },
  { number: 85, name: 'البروج', englishName: "Al-Buruj", verses: 22, type: 'مكية', pages: [590,590] },
  { number: 86, name: 'الطارق', englishName: "At-Tariq", verses: 17, type: 'مكية', pages: [591,591] },
  { number: 87, name: 'الأعلى', englishName: "Al-A'la", verses: 19, type: 'مكية', pages: [591,592] },
  { number: 88, name: 'الغاشية', englishName: "Al-Ghashiyah", verses: 26, type: 'مكية', pages: [592,593] },
  { number: 89, name: 'الفجر', englishName: "Al-Fajr", verses: 30, type: 'مكية', pages: [593,594] },
  { number: 90, name: 'البلد', englishName: "Al-Balad", verses: 20, type: 'مكية', pages: [594,594] },
  { number: 91, name: 'الشمس', englishName: "Ash-Shams", verses: 15, type: 'مكية', pages: [595,595] },
  { number: 92, name: 'الليل', englishName: "Al-Layl", verses: 21, type: 'مكية', pages: [595,596] },
  { number: 93, name: 'الضحى', englishName: "Ad-Duha", verses: 11, type: 'مكية', pages: [596,596] },
  { number: 94, name: 'الشرح', englishName: "Ash-Sharh", verses: 8, type: 'مكية', pages: [596,597] },
  { number: 95, name: 'التين', englishName: "At-Tin", verses: 8, type: 'مكية', pages: [597,597] },
  { number: 96, name: 'العلق', englishName: "Al-'Alaq", verses: 19, type: 'مكية', pages: [597,598] },
  { number: 97, name: 'القدر', englishName: "Al-Qadr", verses: 5, type: 'مكية', pages: [598,598] },
  { number: 98, name: 'البينة', englishName: "Al-Bayyinah", verses: 8, type: 'مدنية', pages: [598,599] },
  { number: 99, name: 'الزلزلة', englishName: "Az-Zilzal", verses: 8, type: 'مدنية', pages: [599,599] },
  { number: 100, name: 'العاديات', englishName: "Al-'Adiyat", verses: 11, type: 'مكية', pages: [599,600] },
  { number: 101, name: 'القارعة', englishName: "Al-Qari'ah", verses: 11, type: 'مكية', pages: [600,600] },
  { number: 102, name: 'التكاثر', englishName: "At-Takathur", verses: 8, type: 'مكية', pages: [600,600] },
  { number: 103, name: 'العصر', englishName: "Al-'Asr", verses: 3, type: 'مكية', pages: [601,601] },
  { number: 104, name: 'الهمزة', englishName: "Al-Humazah", verses: 9, type: 'مكية', pages: [601,601] },
  { number: 105, name: 'الفيل', englishName: "Al-Fil", verses: 5, type: 'مكية', pages: [601,601] },
  { number: 106, name: 'قريش', englishName: "Quraysh", verses: 4, type: 'مكية', pages: [602,602] },
  { number: 107, name: 'الماعون', englishName: "Al-Ma'un", verses: 7, type: 'مكية', pages: [602,602] },
  { number: 108, name: 'الكوثر', englishName: "Al-Kawthar", verses: 3, type: 'مكية', pages: [602,602] },
  { number: 109, name: 'الكافرون', englishName: "Al-Kafirun", verses: 6, type: 'مكية', pages: [603,603] },
  { number: 110, name: 'النصر', englishName: "An-Nasr", verses: 3, type: 'مدنية', pages: [603,603] },
  { number: 111, name: 'المسد', englishName: "Al-Masad", verses: 5, type: 'مكية', pages: [603,603] },
  { number: 112, name: 'الإخلاص', englishName: "Al-Ikhlas", verses: 4, type: 'مكية', pages: [604,604] },
  { number: 113, name: 'الفلق', englishName: "Al-Falaq", verses: 5, type: 'مكية', pages: [604,604] },
  { number: 114, name: 'الناس', englishName: "An-Nas", verses: 6, type: 'مكية', pages: [604,604] },
];

export function getSurahs() { return SURAH_LIST; }
export function getSurah(number) { return SURAH_LIST.find(function(s) { return s.number === number; }); }

export function getAyahAudioUrl(reciterId, ayahNumber, bitrate) {
  if (!bitrate) bitrate = 128;
  return AUDIO_CDN + '/' + bitrate + '/' + reciterId + '/' + ayahNumber + '.mp3';
}

export function getSurahAudioUrl(reciterId, surahNumber, bitrate) {
  if (!bitrate) bitrate = 128;
  return SURAH_AUDIO_CDN + '/' + bitrate + '/' + reciterId + '/' + surahNumber + '.mp3';
}

export function getAyahImageUrl(surah, ayah, highRes) {
  var base = 'https://cdn.islamic.network/quran/images';
  return highRes
    ? base + '/high-resolution/' + surah + '_' + ayah + '.png'
    : base + '/' + surah + '_' + ayah + '.png';
}

async function fetchFromYourAPI(pageNumber) {
  try {
    var response = await fetch(YOUR_API_BASE + '/quran/page/' + pageNumber + '/');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    console.warn('Your API failed:', error.message);
    return null;
  }
}

import { getPageFromOffline } from './quranOfflineData';

export var MOCK_PAGE_DATA = {
  "سورة الفاتحة": {
    "name": "سورة الفاتحة",
    "pre_basmala": false,
    "ayat": {
      "1": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 2,
        "words": [
          { "id": 1, "text": "بِسْمِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 2, "text": "ٱللَّهِ", "tajweed_rule": "ghunna", "waqf_mark": "" },
          { "id": 3, "text": "ٱلرَّحْمَـٰنِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 4, "text": "ٱلرَّحِيمِ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "2": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 2,
        "words": [
          { "id": 5, "text": "ٱلْحَمْدُ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 6, "text": "لِلَّهِ", "tajweed_rule": "ghunna", "waqf_mark": "" },
          { "id": 7, "text": "رَبِّ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 8, "text": "ٱلْعَـٰلَمِينَ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "3": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 3,
        "words": [
          { "id": 9, "text": "ٱلرَّحْمَـٰنِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 10, "text": "ٱلرَّحِيمِ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "4": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 3,
        "words": [
          { "id": 11, "text": "مَـٰلِكِ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 12, "text": "يَوْمِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 13, "text": "ٱلدِّينِ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "5": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 4,
        "words": [
          { "id": 14, "text": "إِيَّاكَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 15, "text": "نَعْبُدُ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 16, "text": "وَإِيَّاكَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 17, "text": "نَسْتَعِينُ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "6": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 4,
        "words": [
          { "id": 18, "text": "ٱهْدِنَا", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 19, "text": "ٱلصِّرَٰطَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 20, "text": "ٱلْمُسْتَقِيمَ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "7": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 5,
        "words": [
          { "id": 21, "text": "صِرَٰطَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 22, "text": "ٱلَّذِينَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 23, "text": "أَنْعَمْتَ", "tajweed_rule": "ghunna", "waqf_mark": "" },
          { "id": 24, "text": "عَلَيْهِمْ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 25, "text": "غَيْرِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 26, "text": "ٱلْمَغْضُوبِ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 27, "text": "عَلَيْهِمْ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 28, "text": "وَلَا", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 29, "text": "ٱلضَّآلِّينَ", "tajweed_rule": "idgham", "waqf_mark": "۩" },
        ]
      },
    }
  },
  "سورة البقرة": {
    "name": "سورة البقرة",
    "pre_basmala": true,
    "ayat": {
      "1": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 6,
        "words": [
          { "id": 30, "text": "الٓمٓ", "tajweed_rule": "idgham", "waqf_mark": "" },
        ]
      },
      "2": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 6,
        "words": [
          { "id": 31, "text": "ذَٰلِكَ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 32, "text": "ٱلْكِتَـٰبُ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 33, "text": "لَا", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 34, "text": "رَيْبَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 35, "text": "ۛ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 36, "text": "فِيهِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 37, "text": "هُدًى", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 38, "text": "لِّلْمُتَّقِينَ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "3": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 7,
        "words": [
          { "id": 39, "text": "ٱلَّذِينَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 40, "text": "يُؤْمِنُونَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 41, "text": "بِٱلْغَيْبِ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 42, "text": "وَيُقِيمُونَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 43, "text": "ٱلصَّلَوٰةَ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 44, "text": "وَمِمَّا", "tajweed_rule": "ghunna", "waqf_mark": "" },
          { "id": 45, "text": "رَزَقْنَـٰهُمْ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 46, "text": "يُنفِقُونَ", "tajweed_rule": null, "waqf_mark": "" },
        ]
      },
      "4": {
        "sajda": false,
        "sajda_type": null,
        "line_number": 7,
        "words": [
          { "id": 47, "text": "وَٱلَّذِينَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 48, "text": "يُؤْمِنُونَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 49, "text": "بِمَآ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 50, "text": "أُنزِلَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 51, "text": "إِلَيْكَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 52, "text": "وَمَآ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 53, "text": "أُنزِلَ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 54, "text": "مِن", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 55, "text": "قَبْلِكَ", "tajweed_rule": "qalqala", "waqf_mark": "" },
          { "id": 56, "text": "وَبِٱلْأٓخِرَةِ", "tajweed_rule": "ikhfa", "waqf_mark": "" },
          { "id": 57, "text": "هُمْ", "tajweed_rule": null, "waqf_mark": "" },
          { "id": 58, "text": "يُوقِنُونَ", "tajweed_rule": "qalqala", "waqf_mark": "" },
        ]
      },
    }
  },
};

export async function fetchQuranPage(pageNumber) {
  var offline = getPageFromOffline(pageNumber);
  if (offline && Object.keys(offline).length > 0) return offline;

  var data = await fetchFromYourAPI(pageNumber);
  if (data) return data;

  if (pageNumber === 1) {
    return JSON.parse(JSON.stringify(MOCK_PAGE_DATA));
  }

  return generatePagePlaceholder(pageNumber);
}

function generatePagePlaceholder(pageNumber) {
  var surah = SURAH_LIST.find(function(s) { return s.pages && pageNumber >= s.pages[0] && pageNumber <= (s.pages[1] || s.pages[0]); });
  if (!surah) return null;

  var surahKey = 'سورة ' + surah.name;
  var pageData = {};
  pageData[surahKey] = {
    name: surahKey,
    pre_basmala: surah.number !== 9 && surah.number !== 1,
    ayat: {
      "1": {
        sajda: false,
        sajda_type: null,
        line_number: 1,
        words: [
          { id: 1, text: 'الصفحة ' + pageNumber, tajweed_rule: null, waqf_mark: '' },
          { id: 2, text: '—', tajweed_rule: null, waqf_mark: '' },
          { id: 3, text: surah.name, tajweed_rule: null, waqf_mark: '' },
        ],
      },
    },
  };
  return pageData;
}

export var TAFSIR_SOURCES = [
  { id: 'ibn_kathir', name: 'تفسير ابن كثير', author: 'الحافظ ابن كثير' },
  { id: 'saadi', name: 'تفسير السعدي', author: 'الشيخ عبد الرحمن السعدي' },
  { id: 'qurtubi', name: 'تفسير القرطبي', author: 'الإمام القرطبي' },
  { id: 'tabari', name: 'تفسير الطبري', author: 'الإمام الطبري' },
  { id: 'baghawi', name: 'تفسير البغوي', author: 'الإمام البغوي' },
];
