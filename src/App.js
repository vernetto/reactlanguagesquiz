import React, { useState, useEffect } from 'react';

function App() {
  const [sentences, setSentences] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  // Load sentences from JSON file
  useEffect(() => {
    fetch("/sentences.json")
      .then(res => res.json())
      .then(data => {
        setSentences(data);
        setCurrentSentence(data[0]);
      });
  }, []);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    if (userInput === currentSentence.answer) {
      setScore(score + 1);
    }
    // Go to next sentence
    const currentIndex = sentences.indexOf(currentSentence);
    const nextSentence = sentences[currentIndex + 1];
    setCurrentSentence(nextSentence);
    setUserInput(""); // Reset user input
  };

  return (
    <div className="App">
      {currentSentence && <h1>{currentSentence.sentence}</h1>}
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <h2>Score: {score}</h2>
    </div>
  );
}

export default App;
