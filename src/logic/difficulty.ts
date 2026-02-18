import type{ Difficulty } from "../types/quiz";

export function nextDifficulty(d: Difficulty): Difficulty {
  if (d === "EASY") return "MEDIUM";
  if (d === "MEDIUM") return "HARD";
  return "HARD";
}

export function prevDifficulty(d: Difficulty): Difficulty {
  if (d === "HARD") return "MEDIUM";
  if (d === "MEDIUM") return "EASY";
  return "EASY";
}

export function maybeAdjustDifficulty(params: {
  difficulty: Difficulty;
  streakCorrect: number;
  streakIncorrect: number;
}): { difficulty: Difficulty; streakCorrect: number; streakIncorrect: number } {
  let { difficulty, streakCorrect, streakIncorrect } = params;

  if (streakCorrect >= 2) {
    difficulty = nextDifficulty(difficulty);
    streakCorrect = 0;
  }

  if (streakIncorrect >= 2) {
    difficulty = prevDifficulty(difficulty);
    streakIncorrect = 0;
  }

  return { difficulty, streakCorrect, streakIncorrect };
}
