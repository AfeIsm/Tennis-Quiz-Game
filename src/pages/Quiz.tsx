import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tennisQuestions } from "../data/tennisQuestions";
import { maybeAdjustDifficulty } from "../logic/difficulty";
import { pickFallbackQuestion } from "../logic/quizEngine";
import type { AnswerRecord, Difficulty, Question } from "../types/quiz";

const TOTAL_QUESTIONS = 10;

function difficultyPriorityAround(d: Difficulty): Difficulty[] {
  if (d === "EASY") return ["EASY", "MEDIUM", "HARD"];
  if (d === "MEDIUM") return ["MEDIUM", "EASY", "HARD"];
  return ["HARD", "MEDIUM", "EASY"];
}

export default function Quiz() {
  const navigate = useNavigate();
  const bank = useMemo(() => tennisQuestions, []);

  const [usedIds, setUsedIds] = useState<Set<string>>(() => new Set());
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [streakCorrect, setStreakCorrect] = useState(0);
  const [streakIncorrect, setStreakIncorrect] = useState(0);

  const [index, setIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const [current, setCurrent] = useState<Question | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // pick first question
  useEffect(() => {
    const q = pickFallbackQuestion({
      bank,
      difficultyOrder: difficultyPriorityAround("EASY"),
      usedIds,
    });
    setCurrent(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChoose(choiceId: string) {
    if (!current || showFeedback) return;

    setSelectedId(choiceId);
    setShowFeedback(true);

    const correct = choiceId === current.correctChoiceId;
    if (correct) {
      setScore((s) => s + 1);
      setStreakCorrect((x) => x + 1);
      setStreakIncorrect(0);
    } else {
      setStreakIncorrect((x) => x + 1);
      setStreakCorrect(0);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: current.id,
        prompt: current.prompt,
        chosenId: choiceId,
        correctChoiceId: current.correctChoiceId,
        correct,
        difficulty: current.difficulty,
      },
    ]);
  }

  function handleNext() {
    if (!current) return;

    // mark used
    setUsedIds((prev) => {
      const next = new Set(prev);
      next.add(current.id);
      return next;
    });

    // compute new difficulty based on streaks *after* current question
    const correct = selectedId === current.correctChoiceId;
    const nextStreakCorrect = correct ? streakCorrect : 0;
    const nextStreakIncorrect = correct ? 0 : streakIncorrect;

    const adjusted = maybeAdjustDifficulty({
      difficulty,
      streakCorrect: nextStreakCorrect,
      streakIncorrect: nextStreakIncorrect,
    });

    setDifficulty(adjusted.difficulty);
    setStreakCorrect(adjusted.streakCorrect);
    setStreakIncorrect(adjusted.streakIncorrect);

    // finish?
    if (index >= TOTAL_QUESTIONS) {
      navigate("/summary", {
        state: {
          sport: "Tennis",
          score: correct ? score : score, // score already updated in choose()
          total: TOTAL_QUESTIONS,
          answers,
        },
      });
      return;
    }

    // pick next question using updated usedIds (we must compute it locally too)
    const usedLocal = new Set(usedIds);
    usedLocal.add(current.id);

    const q = pickFallbackQuestion({
      bank,
      difficultyOrder: difficultyPriorityAround(adjusted.difficulty),
      usedIds: usedLocal,
    });

    setCurrent(q);
    setIndex((i) => i + 1);
    setSelectedId(null);
    setShowFeedback(false);
  }

  if (!current) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Loading questions…</h2>
          <p style={styles.p}>
            If this never loads, add more questions to the bank.
          </p>
        </div>
      </div>
    );
  }

  const correct = selectedId === current.correctChoiceId;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          <div style={{ fontWeight: 700 }}>
            Question {index} / {TOTAL_QUESTIONS}
          </div>
          <div style={styles.badge}>Difficulty: {difficulty}</div>
          <div style={{ opacity: 0.9 }}>
            Score: <strong>{score}</strong>
          </div>
        </div>

        <h1 style={styles.h1}>{current.prompt}</h1>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {current.choices.map((c) => {
            const isSelected = selectedId === c.id;
            const isCorrectChoice = c.id === current.correctChoiceId;

            let bg = "rgba(255,255,255,0.06)";
            let border = "1px solid rgba(255,255,255,0.10)";

            if (showFeedback && isCorrectChoice) {
              bg = "rgba(34,197,94,0.18)";
              border = "1px solid rgba(34,197,94,0.45)";
            } else if (showFeedback && isSelected && !isCorrectChoice) {
              bg = "rgba(239,68,68,0.18)";
              border = "1px solid rgba(239,68,68,0.45)";
            } else if (isSelected) {
              bg = "rgba(255,255,255,0.12)";
              border = "1px solid rgba(255,255,255,0.22)";
            }

            return (
              <button
                key={c.id}
                onClick={() => handleChoose(c.id)}
                style={{ ...styles.choiceBtn, background: bg, border }}
                disabled={showFeedback}
              >
                {c.text}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div
            style={{
              ...styles.feedback,
              borderColor: correct
                ? "rgba(34,197,94,0.45)"
                : "rgba(239,68,68,0.45)",
              background: correct
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              {correct ? "✅ Correct!" : "❌ Not quite!"}
            </div>
            <div style={{ opacity: 0.95 }}>{current.explanation}</div>

            <div style={{ marginTop: 12 }}>
              <button style={styles.primaryBtn} onClick={handleNext}>
                {index >= TOTAL_QUESTIONS ? "Finish" : "Next Question"}
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16, fontSize: 13, opacity: 0.85 }}>
          Adaptive rule: 2 correct in a row → harder • 2 incorrect in a row →
          easier
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    background: "#0b1220",
    color: "white",
  },
  card: {
    width: "min(900px, 100%)",
    background: "#121a2b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  topRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    opacity: 0.95,
  },
  badge: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontSize: 13,
  },
  h1: { margin: "14px 0 6px", fontSize: 28, lineHeight: 1.25 },
  h2: { margin: 0, fontSize: 18 },
  p: { marginTop: 10, lineHeight: 1.5, opacity: 0.9 },
  choiceBtn: {
    textAlign: "left",
    padding: 14,
    borderRadius: 12,
    color: "white",
    cursor: "pointer",
    fontSize: 16,
  },
  feedback: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
  },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    background: "white",
    color: "#0b1220",
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
  },
};
