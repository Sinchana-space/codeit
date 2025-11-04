import React, { useState } from "react";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [corrected, setCorrected] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/correct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: "Python" })
    });
    const data = await res.json();
    setCorrected(data.corrected_code);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Code Corrector</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={60}
        placeholder="Paste your code here..."
      />
      <br />
      <button onClick={handleSubmit}>Correct Code</button>
      <pre>{corrected}</pre>
    </div>
  );
}

export default CodeEditor;
