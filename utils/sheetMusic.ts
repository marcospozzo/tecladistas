export const difficultyMap: Record<string, string> = {
  Beginner: "Principiante",
  Intermediate: "Intermedio",
  Advanced: "Avanzado",
};

export const genreMap: Record<string, string> = {
  Classical: "Clásico",
  Jazz: "Jazz",
  Pop: "Popular",
  Educational: "Educacional",
  Tango: "Tango",
  Soundtrack: "Soundtrack",
};

export function translateSheetMusicDifficulty(difficulty?: string) {
  if (!difficulty) {
    return difficulty;
  }

  return difficultyMap[difficulty] ?? difficulty;
}

export function translateSheetMusicGenre(genre?: string) {
  if (!genre) {
    return genre;
  }

  return genreMap[genre] ?? genre;
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return "—";
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
