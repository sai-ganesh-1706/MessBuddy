import { useState } from "react";

export default function Login({ onLogin }) {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!roll || !password) {
      setError("Please enter roll number and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: roll, password })
      });

      const data = await res.json();

      if (!data.success) {
        setError("Invalid roll number or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("studentId", data.studentId);
      localStorage.setItem("studentName", data.name);

      onLogin({ studentId: data.studentId, name: data.name });
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🍽️ MessBuddy</h1>
        <p className="login-subtitle">
          Login with your college roll number
        </p>

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {error && <p className="login-error">{error}</p>}

        <button onClick={submit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-note">
          First-time users use the default password
        </p>
      </div>
    </div>
  );
}
