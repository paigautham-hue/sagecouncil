/**
 * Mapping of teacherId to portrait image filename
 * This ensures correct image loading for all sages
 */
const SAGE_PORTRAIT_MAP: Record<string, string> = {
  adyashanti: 'adyashanti.png',
  alan_watts: 'alan-watts.png',
  baruch_spinoza: 'spinoza.png',
  bessel_van_der_kolk: 'bessel-van-der-kolk.png',
  carl_jung: 'carl-jung.png',
  david_bohm: 'david-bohm.png',
  eckhart_tolle: 'eckhart-tolle.png',
  epictetus: 'epictetus.png',
  francisco_varela: 'francisco-varela.png',
  gabor_mate: 'gabor-mate.png',
  'gabor-maté': 'gabor-mate.png',
  gautama_buddha: 'gautama-buddha.png',
  hafiz: 'hafiz.png',
  iain_mcgilchrist: 'iain-mcgilchrist.png',
  ibn_arabi: 'ibn-arabi.png',
  jack_kornfield: 'jack-kornfield.png',
  james_hillman: 'james-hillman.png',
  jon_kabat_zinn: 'jon-kabat-zinn.png',
  kabir: 'kabir.png',
  krishnamurti: 'krishnamurti.png',
  lao_tzu: 'lao-tzu.png',
  marcus_aurelius: 'marcus-aurelius.png',
  mooji: 'mooji.png',
  nisargadatta: 'nisargadatta.png',
  osho: 'osho.png',
  pema_chodron: 'pema-chodron.png',
  plato: 'plato.png',
  rabindranath_tagore: 'rabindranath-tagore.png',
  rainer_maria_rilke: 'rainer-maria-rilke.png',
  ramana_maharshi: 'ramana-maharshi.png',
  jalal_ad_din_rumi: 'rumi.png',
  sam_harris: 'sam-harris.png',
  seneca: 'seneca.png',
  socrates: 'socrates.png',
  tara_brach: 'tara-brach.png',
  thich_nhat_hanh: 'thich-nhat-hanh.png',
  viktor_frankl: 'viktor-frankl.png',
};

/**
 * Helper to get sage portrait image URL by teacherId
 * @param teacherId - The teacher's ID (e.g., 'alan_watts')
 * @returns The full path to the portrait image
 */
export function getSagePortrait(teacherId: string): string {
  // Look up in mapping first
  if (SAGE_PORTRAIT_MAP[teacherId]) {
    return `/sages/${SAGE_PORTRAIT_MAP[teacherId]}`;
  }
  
  // Fallback: convert teacherId to filename format
  // Replace underscores with hyphens
  const filename = teacherId.replace(/_/g, '-');
  return `/sages/${filename}.png`;
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

/**
 * Check if a sage portrait exists
 */
export function hasSagePortrait(teacherId: string): boolean {
  return teacherId in SAGE_PORTRAIT_MAP;
}
