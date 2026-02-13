import { useState } from "react";

export default function ChangePasswordModal({ studentId, onClose }) {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!oldPwd || !newPwd) {
      setError("Please fill all fields");
      return;
    }

    if (newPwd.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            oldPassword: oldPwd,
            newPassword: newPwd
          })
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError("Old password is incorrect");
        setLoading(false);
        return;
      }

      onClose();
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <div className="modal-actions">
          <button
            className="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button onClick={submit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
