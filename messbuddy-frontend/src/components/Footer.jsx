import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-left">
        <span>🍽️ MessBuddy</span>
        <span className="footer-version">v1.0</span>
      </div>

      <div className="footer-center">
        <span>
          © {new Date().getFullYear()} MessBuddy • All rights reserved
        </span>
      </div>

      <div className="footer-right">
        <span>Built By B SAIGANESH</span>
      </div>
    </footer>
  );
}
