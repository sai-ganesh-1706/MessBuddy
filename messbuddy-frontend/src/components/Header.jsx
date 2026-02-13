import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      {/* Left: College Logo */}
      <div className="header-left">
        <img
          src="/college-logo.png"
          alt="College Logo"
          className="college-logo"
        />
      </div>

      {/* Center: App Name */}
      <div className="header-center">
        <h1>🍽️ MessBuddy</h1>
      </div>

      {/* Right: Student Profile + Theme */}
      <div className="header-right">
        <span className="student-name">Hi, Student</span>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Night" : "☀ Day"}
        </button>
      </div>
    </header>
  );
}
