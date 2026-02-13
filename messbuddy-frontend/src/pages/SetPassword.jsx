import { useState } from "react";

export default function SetPassword({ studentId, onDone }) {
  const [pwd, setPwd] = useState("");

  const submit = async () => {
    await fetch("http://localhost:5000/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, newPassword: pwd })
    });

    localStorage.setItem("studentId", studentId);
    onDone(studentId);
  };

  return (
    <div className="login-page">
      <h3>Set New Password</h3>
      <input type="password" placeholder="New password" onChange={e => setPwd(e.target.value)} />
      <button onClick={submit}>Save</button>
    </div>
  );
}
