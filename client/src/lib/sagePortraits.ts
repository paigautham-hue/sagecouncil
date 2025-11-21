const PORTRAIT_FILES = [
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
 * Normalize names or IDs for consistent lookup
 */
const normalizeIdentifier = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Strip diacritics
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

/**
 * Mapping of sage names and alternate identifiers to their image filenames
 * Handles special characters, accents, and parentheses
 */
const RAW_SAGE_IMAGE_MAP: Record<string, string> = {
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
  'Hafez of Shiraz': 'hafiz',
  'Iain McGilchrist': 'iain-mcgilchrist',
  'Ibn Arabi': 'ibn-arabi',
  'Jack Kornfield': 'jack-kornfield',
  'Jalal ad-Din Rumi': 'rumi',
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

const SPECIAL_ALIASES: Record<string, string> = {
  'jalal-ad-din-rumi': 'rumi',
  'hafiz-of-shiraz': 'hafiz',
  'sam-harris-meditation-and-secular-spirituality': 'sam-harris',
};

const SAGE_IMAGE_MAP: Record<string, string> = {
  ...PORTRAIT_FILES.reduce((map, slug) => ({ ...map, [slug]: slug }), {} as Record<string, string>),
  ...SPECIAL_ALIASES,
  ...Object.keys(RAW_SAGE_IMAGE_MAP).reduce((map, name) => ({
    ...map,
    [normalizeIdentifier(name)]: RAW_SAGE_IMAGE_MAP[name],
  }), {} as Record<string, string>),
};

/**
 * Helper to get sage portrait image URL
 * Uses explicit mapping to handle special characters and accents
 */
export function getSagePortrait(identifier: string): string {
  const normalized = normalizeIdentifier(identifier);
  const filename = SAGE_IMAGE_MAP[normalized];

  if (filename) {
    return `/sages/${filename}.png`;
  }

  return `/sages/${normalized || 'placeholder'}.png`;
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
