import React, { useState, useEffect } from 'react';
import SentenceDisplay from './SentenceDisplay';
import GuessButtons from './GuessButtons';
import ScoreDisplay from './ScoreDisplay';
import sentences from '../helpers/sentences';

import TheEnchantedApril from '../books/theEnchantedApril';
import TheLittleGrayLady from '../books/theLittleGrayLady';

import './App.css'

const books = [TheEnchantedApril, TheLittleGrayLady];

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * books.length);
  return books[randomIndex];
}

function getRandomSentence(book) {
  const text = book.text;
  // Split the text into sentences using a regular expression
  const sentences = text.match(/[^.!?]*[.!?]/g);

  const interestingSentences = sentences.filter(sentence => {
    return sentence.split(/\s+/).length >= 10;
  });

  // Get a random sentence from the filtered list
  const randomIndex = Math.floor(Math.random() * interestingSentences.length);
  return interestingSentences[randomIndex].trim();
}

function App() {
  const [currentSentence, setCurrentSentence] = useState({});
  const [currentBook, setCurrentBook] = useState({});
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);


  useEffect(() => {
    generateRandomSentence();
  }, []);

  const generateRandomSentence = () => {
    const book = getRandomBook();
    const randomSentence = getRandomSentence(book);
    console.log(randomSentence)

    // const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
    setCurrentBook(book);
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
        <h1>Author gender guesser!</h1>
        {guesses < 10 ? (
            <>
              <h2>What is the gender of the author of the following:</h2>
              <SentenceDisplay sentence={currentSentence} />
              <GuessButtons onGuess={handleGuess} />
            </>
        ) : (
            <ScoreDisplay score={score} />
        )}
      </div>
  );
}

export default App;
