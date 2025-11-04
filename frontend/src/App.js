import React, { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setCorrected(data.corrected_code || "No correction received");
    } catch (err) {
      console.error(err);
      setCorrected("Error: Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>🧠 AI Code Corrector</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option>Python</option>
        <option>JavaScript</option>
        <option>C++</option>
        <option>Java</option>
      </select>

      <br />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="70"
        placeholder="Paste your code here..."
        style={{ marginBottom: "10px", marginTop: "10px" }}
      ></textarea>
      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Correcting..." : "Correct Code"}
      </button>

      <h3 style={{ marginTop: "20px" }}>✅ Corrected Code:</h3>
      <pre
        style={{
          backgroundColor: "#1e1e1e",
          color: "#00ff90",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
        }}
      >
        {corrected}
      </pre>
    </div>
  );
}

export default App;
