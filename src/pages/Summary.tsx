import { useLocation, Link, useNavigate } from "react-router-dom";
import type { AnswerRecord } from "../types/quiz";
import { useEffect } from "react";

type SummaryState = {
  sport: string;
  score: number;
  total: number;
  answers: AnswerRecord[];
};

export default function Summary() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state as SummaryState | null) ?? null;

  useEffect(() => {
    if (!state) {
      // direct visit to /summary without state
      nav("/", { replace: true });
    }
  }, [state, nav]);

  if (!state) return null;

  const lastAttempt = {
    sport: state.sport,
    score: state.score,
    total: state.total,
    finishedAtIso: new Date().toISOString(),
  };
  localStorage.setItem("ruleRunner:lastAttempt", JSON.stringify(lastAttempt));

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Summary ✅</h1>

        <div style={styles.scoreBox}>
          <div style={{ fontSize: 16, opacity: 0.9 }}>Your score</div>
          <div style={{ fontSize: 42, fontWeight: 900 }}>
            {state.score} / {state.total}
          </div>
          <div style={{ opacity: 0.85, marginTop: 6 }}>
            Sport: <strong>{state.sport}</strong>
          </div>
        </div>

        <h2 style={styles.h2}>What you learned</h2>
        <ul style={{ marginTop: 6, lineHeight: 1.6, opacity: 0.92 }}>
          <li>Basic scoring (love, 15/30/40, deuce/advantage)</li>
          <li>Serving rules (two serves, double faults, service boxes)</li>
          <li>Common edge cases (lets, line calls, net-cord rallies)</li>
        </ul>

        <h2 style={styles.h2}>Your answers</h2>
        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          {state.answers.map((a, i) => (
            <div key={a.questionId} style={styles.answerRow}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>
                  {i + 1}. ({a.difficulty}) {a.correct ? "✅" : "❌"}
                </strong>
              </div>
              <div style={{ marginTop: 6, opacity: 0.95 }}>{a.prompt}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/quiz" style={styles.primaryBtn}>
            Try again
          </Link>
          <Link to="/" style={styles.secondaryBtn}>
            Back to home
          </Link>
        </div>

        <div style={{ marginTop: 16, fontSize: 13, opacity: 0.85 }}>
          Saved your result locally so the home screen can show your last attempt.
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
  h1: { margin: 0, fontSize: 34 },
  h2: { margin: "18px 0 8px", fontSize: 18 },
  scoreBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  answerRow: {
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  primaryBtn: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    background: "white",
    color: "#0b1220",
    textDecoration: "none",
    fontWeight: 800,
  },
  secondaryBtn: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.10)",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.14)",
  },
};
