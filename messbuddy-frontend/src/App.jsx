import { useState } from "react";
import Header from "./components/Header";
import TodayMenu from "./components/TodayMenu";
import Footer from "./components/Footer";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(() => {
    const id = localStorage.getItem("studentId");
    const name = localStorage.getItem("studentName");
    return id ? { studentId: id, name } : null;
  });

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app">
      <Header user={user} />
      <TodayMenu studentId={user.studentId} />
      <Footer />
    </div>
  );
}
