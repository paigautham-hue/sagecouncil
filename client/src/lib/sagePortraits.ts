/**
 * Helper to get sage portrait image URL
 * Converts teacher full name to portrait filename
 */
export function getSagePortrait(fullName: string): string {
  // Convert name to filename format: lowercase, hyphens, no parentheses
  const filename = fullName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/'/g, '');
  
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
