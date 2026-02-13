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
    window.location.reload(); // simplest + safest
  };

  return (
    <>
      <header className="header">
        {/* Left */}
        <div className="header-left">
          <img src="/college-logo.png" className="college-logo" />
        </div>

        {/* Center */}
        <div className="header-center">
          <h1>🍽️ MessBuddy</h1>
        </div>

        {/* Right */}
        <div className="header-right">
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

                <hr/>

                <button
                  className="logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Night" : "☀ Day"}
          </button>
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
