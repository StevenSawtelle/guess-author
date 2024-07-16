import React, { useState, useEffect } from 'react';
import SentenceDisplay from './SentenceDisplay';
import GuessButtons from './GuessButtons';
import ScoreDisplay from './ScoreDisplay';
import sentences from '../helpers/sentences';

import './App.css'

function App() {
  const [currentSentence, setCurrentSentence] = useState({});
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);

  useEffect(() => {
    generateRandomSentence();
  }, []);

  const generateRandomSentence = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
  };

  const handleGuess = (gender) => {
    if (gender === currentSentence.authorGender) {
      setScore(score + 1);
    }
    setGuesses(guesses + 1);
    if (guesses < 9) {
      generateRandomSentence();
    }
  };

  return (
      <div className="App">
        {guesses < 10 ? (
            <>
              <h2>Guess the gender of the author of the following sentence:</h2>
              <SentenceDisplay sentence={currentSentence.sentence} author={currentSentence.author} />
              <GuessButtons onGuess={handleGuess} />
            </>
        ) : (
            <ScoreDisplay score={score} />
        )}
      </div>
  );
}

export default App;
