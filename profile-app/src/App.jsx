import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function StatusBadge({ isOpenToWork }) {
  return (
    <span
      className="badge"
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        fontWeight: 600,
        backgroundColor: isOpenToWork ? "#dcfce7" : "#f3f4f6",
        color: isOpenToWork ? "#15803d" : "#4b5563",
      }}
    >
      {isOpenToWork ? "Open to work" : "Busy learning"}
    </span>
  );
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const isAvailable = true;

  return (
    <main className="profile-container" style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Srun Nai Eang</h1>
      
      <p>
        Goal for this course: Master modern React architecture and build clean, scalable web interfaces.
      </p>

      <StatusBadge isOpenToWork={isAvailable} />

      <hr style={{ margin: "24px 0" }} />

      {/* Rule checklist demonstration */}
      <footer className="profile-footer">
        <small>Profile updated in {currentYear}</small>
      </footer>
    </main>
  );
}