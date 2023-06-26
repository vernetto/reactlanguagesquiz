import React, { useState, useEffect } from 'react';

function App() {
  const [sentences, setSentences] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userInput, setUserInput] = useState({});
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState({});

  // Items per page
  const itemsPerPage = 20;

  // Load sentences from JSON file
  useEffect(() => {
    fetch("/sentences.json")
      .then(res => res.json())
      .then(data => {
        setSentences(data);
      });
  }, []);

  const handleInputChange = (event, index) => {
    setUserInput({...userInput, [index]: event.target.value});
  };

  const handleSubmit = (index) => {
    if (answeredCorrectly[index]) {
      alert('You have already correctly answered this sentence.');
      return;
    }
    if (userInput[index] === sentences[index].answer) {
      setScore(score + 1);
      setAnsweredCorrectly({
        ...answeredCorrectly,
        [index]: true, // Mark this sentence as answered correctly
      });
    }
    setUserInput({...userInput, [index]: ""}); // Reset user input
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Calculate the range of sentences to display
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const sentencesToDisplay = sentences.slice(start, end);

  return (
    <div className="App">
      {sentencesToDisplay.map((sentence, index) => (
        <div key={sentence.id} style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{start + index + 1}. {sentence.sentence}</h2>
          <input type="text" value={userInput[start + index] || ""} onChange={(e) => handleInputChange(e, start + index)} />
          <button onClick={() => handleSubmit(start + index)}>Submit</button>
        </div>
      ))}
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous Page</button>
      <button onClick={handleNextPage} disabled={end >= sentences.length}>Next Page</button>
      <h2>Score: {score}</h2>
      <h3>Page: {currentPage + 1} of {Math.ceil(sentences.length / itemsPerPage)}</h3>
    </div>
  );
}

export default App;
