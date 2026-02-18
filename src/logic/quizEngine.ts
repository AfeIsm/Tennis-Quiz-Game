import type { Difficulty, Question } from "../types/quiz";

export function pickRandomQuestion(params: {
  bank: Question[];
  difficulty: Difficulty;
  usedIds: Set<string>;
}): Question | null {
  const { bank, difficulty, usedIds } = params;

  const candidates = bank.filter(
    (q) => q.difficulty === difficulty && !usedIds.has(q.id)
  );

  if (candidates.length === 0) return null;

  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
}

export function pickFallbackQuestion(params: {
  bank: Question[];
  difficultyOrder: Difficulty[];
  usedIds: Set<string>;
}): Question | null {
  const { bank, difficultyOrder, usedIds } = params;

  for (const d of difficultyOrder) {
    const q = pickRandomQuestion({ bank, difficulty: d, usedIds });
    if (q) return q;
  }
  return null;
}
