import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ChangePasswordModal from "./ChangePasswordModal";
import { getAvatarColor } from "../utils/avatarColor";

export default function Header({ user }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);

  const logout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    window.location.reload();
  };

  return (
    <>
      <header className="header">

        {/* TOP ROW */}
        <div className="header-top">
          <img src="/college-logo.png" className="college-logo" />
          <h1>🍽️ MessBuddy</h1>
        </div>

        {/* BOTTOM ROW */}
        <div className="header-bottom">

          {/* LEFT → Theme Button */}
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Night" : "☀ Day"}
          </button>

          {/* RIGHT → Profile */}
          <div className="profile" onClick={() => setOpen(!open)}>
            <div
              className="avatar"
              style={{ background: getAvatarColor(user.name) }}
            >
              {user.name
                .split(" ")
                .map(n => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <span className="student-name">
              Hi, {user.name}
            </span>

            {open && (
              <div className="profile-dropdown">
                <button
                  onClick={() => {
                    setShowPwdModal(true);
                    setOpen(false);
                  }}
                >
                  Change Password
                </button>

                <hr />

                <button
                  className="logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {showPwdModal && (
        <ChangePasswordModal
          studentId={user.studentId}
          onClose={() => setShowPwdModal(false)}
        />
      )}
    </>
  );
}