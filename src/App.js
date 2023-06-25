import React, { useState, useEffect } from 'react';

function App() {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState({});

  // Load sentences from JSON file
  useEffect(() => {
    fetch("/sentences.json")
      .then(res => res.json())
      .then(data => {
        setSentences(data);
      });
  }, []);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
      // Check if this sentence has been answered correctly before
      if (answeredCorrectly[currentSentenceIndex]) {
        alert('You have already correctly answered this sentence.');
        return;
      }
    if (userInput === sentences[currentSentenceIndex].answer) {
      setScore(score + 1);
    setAnsweredCorrectly({
      ...answeredCorrectly,
      [currentSentenceIndex]: true, // Mark this sentence as answered correctly
    });
    }
    handleNext();
    setUserInput(""); // Reset user input
  };

  const handleNext = () => {
    // Prevents going beyond the last sentence
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
    setUserInput(""); // Reset user input
  };

  const handlePrevious = () => {
    // Prevents going before the first sentence
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
    setUserInput(""); // Reset user input
  };

  return (
    <div className="App">
      {sentences.length > 0 && <h1>{sentences[currentSentenceIndex].sentence}</h1>}
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handlePrevious} disabled={currentSentenceIndex === 0}>Previous</button>
      <button onClick={handleNext} disabled={currentSentenceIndex === sentences.length - 1}>Next</button>
      <h2>Score: {score}</h2>
      <h3>Sentence: {currentSentenceIndex + 1} of {sentences.length}</h3>
    </div>
  );
}

export default App;
