import { useMemo } from "react";
import { Link } from "react-router-dom";

type LastAttempt = {
  sport: string;
  score: number;
  total: number;
  finishedAtIso: string;
};

function readLastAttempt(): LastAttempt | null {
  const raw = localStorage.getItem("ruleRunner:lastAttempt");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LastAttempt;
  } catch {
    return null;
  }
}

export default function Home() {
  const last = useMemo(() => readLastAttempt(), []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Rule Runner 🏃‍♂️🎾</h1>
        <p style={styles.p}>
          A quick, kid-friendly tennis rules quiz that adapts to how you’re
          doing.
        </p>

        <div style={{ marginTop: 16 }}>
          <Link to="/quiz" style={styles.primaryBtn}>
            Start 10-Question Quiz
          </Link>
        </div>

        <div style={{ marginTop: 24 }}>
          <h2 style={styles.h2}>Last attempt</h2>
          {last ? (
            <div style={styles.lastBox}>
              <div>
                <strong>{last.sport}</strong>
              </div>
              <div>
                Score: <strong>{last.score}</strong> / {last.total}
              </div>
              <div style={{ opacity: 0.8, fontSize: 13 }}>
                Finished: {new Date(last.finishedAtIso).toLocaleString()}
              </div>
            </div>
          ) : (
            <p style={{ ...styles.p, opacity: 0.8 }}>
              No attempts yet. Start one!
            </p>
          )}
        </div>

        <div style={{ marginTop: 18, fontSize: 13, opacity: 0.85 }}>
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
    width: "min(720px, 100%)",
    background: "#121a2b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  h1: { margin: 0, fontSize: 34 },
  h2: { margin: "16px 0 8px", fontSize: 18 },
  p: { marginTop: 10, lineHeight: 1.5, opacity: 0.9 },
  primaryBtn: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 12,
    background: "white",
    color: "#0b1220",
    textDecoration: "none",
    fontWeight: 700,
  },
  lastBox: {
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
};
