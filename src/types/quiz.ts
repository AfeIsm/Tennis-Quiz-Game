export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type Choice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  sport: "Tennis";
  difficulty: Difficulty;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
};

export type AnswerRecord = {
  questionId: string;
  prompt: string;
  chosenId: string;
  correctChoiceId: string;
  correct: boolean;
  difficulty: Difficulty;
};
