import { useState } from "react";

export default function Login({ onLogin }) {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: roll, password })
    });

    const data = await res.json();
    if (!data.success) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("studentId", roll);
    onLogin(roll);
  };

  return (
    <div className="login-page">
      <h2>MessBuddy Login</h2>

      <input placeholder="Roll Number" onChange={e => setRoll(e.target.value)} />
      <input type="password" placeholder="Default / Your Password"
             onChange={e => setPassword(e.target.value)} />

      <button onClick={submit}>Login</button>
    </div>
  );
}
