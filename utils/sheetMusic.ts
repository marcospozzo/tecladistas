const difficultyMap: Record<string, string> = {
  Beginner: "Principiante",
  Intermediate: "Intermedio",
  Advanced: "Avanzado",
};

const genreMap: Record<string, string> = {
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
