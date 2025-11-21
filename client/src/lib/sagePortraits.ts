/**
 * Array of all available sage portrait filenames
 * Ensures all 36 sages have corresponding images
 */
export const PORTRAIT_FILES = [
  'adyashanti',
  'alan-watts',
  'baruch-spinoza',
  'bessel-van-der-kolk',
  'carl-jung',
  'david-bohm',
  'eckhart-tolle',
  'epictetus',
  'francisco-varela',
  'gabor-mate',
  'gautama-buddha',
  'hafiz',
  'iain-mcgilchrist',
  'ibn-arabi',
  'jack-kornfield',
  'jalal-ad-din-rumi',
  'james-hillman',
  'jiddu-krishnamurti',
  'jon-kabat-zinn',
  'kabir',
  'krishnamurti',
  'lao-tzu',
  'marcus-aurelius',
  'mooji',
  'nisargadatta',
  'nisargadatta-maharaj',
  'osho',
  'pema-chodron',
  'plato',
  'rabindranath-tagore',
  'rainer-maria-rilke',
  'ramana-maharshi',
  'rumi',
  'sam-harris',
  'seneca',
  'socrates',
  'spinoza',
  'tara-brach',
  'thich-nhat-hanh',
  'viktor-frankl',
];

/**
 * Mapping of sage names to their image filenames
 * Handles special characters, accents, and parentheses
 */
const SAGE_IMAGE_MAP: Record<string, string> = {
  'Adyashanti': 'adyashanti',
  'Alan Watts': 'alan-watts',
  'Baruch Spinoza': 'baruch-spinoza',
  'Bessel van der Kolk': 'bessel-van-der-kolk',
  'Carl Jung': 'carl-jung',
  'David Bohm': 'david-bohm',
  'Eckhart Tolle': 'eckhart-tolle',
  'Epictetus': 'epictetus',
  'Francisco Varela': 'francisco-varela',
  'Gabor Maté': 'gabor-mate',
  'Gautama Buddha': 'gautama-buddha',
  'Hafiz (Hafez of Shiraz)': 'hafiz',
  'Iain McGilchrist': 'iain-mcgilchrist',
  'Ibn Arabi': 'ibn-arabi',
  'Jack Kornfield': 'jack-kornfield',
  'Jalal ad-Din Rumi': 'jalal-ad-din-rumi',
  'James Hillman': 'james-hillman',
  'Jiddu Krishnamurti': 'jiddu-krishnamurti',
  'Jon Kabat-Zinn': 'jon-kabat-zinn',
  'Kabir': 'kabir',
  'Lao Tzu (Laozi)': 'lao-tzu',
  'Marcus Aurelius': 'marcus-aurelius',
  'Mooji': 'mooji',
  'Nisargadatta Maharaj': 'nisargadatta-maharaj',
  'Osho (Bhagwan Shree Rajneesh)': 'osho',
  'Pema Chödrön': 'pema-chodron',
  'Plato': 'plato',
  'Rabindranath Tagore': 'rabindranath-tagore',
  'Rainer Maria Rilke': 'rainer-maria-rilke',
  'Ramana Maharshi': 'ramana-maharshi',
  'Sam Harris (meditation and secular spirituality)': 'sam-harris',
  'Seneca': 'seneca',
  'Socrates': 'socrates',
  'Tara Brach': 'tara-brach',
  'Thich Nhat Hanh': 'thich-nhat-hanh',
  'Viktor Frankl': 'viktor-frankl',
};

/**
 * Helper to get sage portrait image URL
 * Uses explicit mapping to handle special characters and accents
 */
export function getSagePortrait(fullName: string): string {
  const filename = SAGE_IMAGE_MAP[fullName];
  if (filename) {
    return `/sages/${filename}.png`;
  }
  
  // Fallback: convert name to filename format
  const fallback = fullName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/'/g, '')
    .replace(/ö/g, 'o')
    .replace(/é/g, 'e')
    .replace(/á/g, 'a')
    .replace(/ñ/g, 'n');
  
  return `/sages/${fallback}.png`;
}

/**
 * Get initials from full name as fallback
 */
export function getSageInitials(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
}
