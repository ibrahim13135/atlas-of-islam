const BASE_URL = 'http://188.245.231.24:8000/api/quran';
const pageCache = new Map();

export async function fetchQuranPage(pageNumber) {
  if (pageCache.has(pageNumber)) {
    return pageCache.get(pageNumber);
  }
  
  try {
    const response = await fetch(`${BASE_URL}/page/${pageNumber}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch page ${pageNumber}`);
    }
    
    const data = await response.json();
    pageCache.set(pageNumber, data);
    return data;
  } catch (error) {
    console.error('Quran API Error:', error);
    throw error;
  }
}

export function parsePageData(pageData) {
  const verses = [];
  
  Object.entries(pageData).forEach(([surahName, surahData]) => {
    Object.entries(surahData.ayat).forEach(([ayahNum, ayahData]) => {
      verses.push({
        surahName,
        surahInfo: {
          name: surahData.name,
          preBasmala: surahData.pre_basmala,
        },
        ayahNumber: parseInt(ayahNum),
        sajda: ayahData.sajda,
        sajdaType: ayahData.sajda_type,
        lineNumber: ayahData.line_number,
        words: ayahData.words,
        fullText: ayahData.words.map(w => w.text).join(' '),
      });
    });
  });
  
  return verses;
}