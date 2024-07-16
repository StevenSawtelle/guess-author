import React, { useState, useEffect } from 'react';
import SentenceDisplay from './SentenceDisplay';
import GuessButtons from './GuessButtons';
import ScoreDisplay from './ScoreDisplay';

import Cranford from "../books/cranford";//f
import Disqualified from "../books/disqualified";//m
import DonQuixote from "../books/donQuixote";//m
import JaneEyre from "../books/janeEyre";//f
import RoderickRandom from "../books/roderickRandom";//m
import TheBlueCastle from "../books/theBlueCastle";//f
import TheEnchantedApril from '../books/theEnchantedApril';//f
import TheKingInYellow from "../books/theKingInYellow";//m
import TheLittleGrayLady from '../books/theLittleGrayLady';//m
import YellowWallpaper from "../books/yellowWallpaper";//f

import './App.css'

const books = [Cranford,Disqualified,DonQuixote,JaneEyre,RoderickRandom,TheBlueCastle,TheEnchantedApril,TheKingInYellow,TheLittleGrayLady,YellowWallpaper];

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
  const [currentSentence, setCurrentSentence] = useState('');
  const [currentBook, setCurrentBook] = useState({});
  const [previousSentence, setPreviousSentence] = useState('');
  const [previousBook, setPreviousBook] = useState({});
  const [isPreviousGuessCorrect, setIsPreviousGuessCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);

  useEffect(() => {
    generateRandomSentence();
  }, []);

  const generateRandomSentence = () => {
    const book = getRandomBook();
    const randomSentence = getRandomSentence(book);
    console.log(randomSentence);

    setCurrentSentence(randomSentence);
    setCurrentBook(book);
  };

  const handleGuess = (gender) => {
    const isCorrect = gender.toLowerCase() === currentBook.gender.toLowerCase();
    if (isCorrect) {
      setScore(score + 1);
    }
    setGuesses(guesses + 1);

    setPreviousSentence(currentSentence);
    setPreviousBook(currentBook);
    setIsPreviousGuessCorrect(isCorrect);

    if (guesses < 9) {
      generateRandomSentence();
    }
  };

  return (
      <div className="App">
        <h1>Author gender guesser!</h1>
        {guesses < 10 && (
            <>
              <h2>What is the gender of the author of the following:</h2>
              <SentenceDisplay sentence={currentSentence} />
              <GuessButtons onGuess={handleGuess} />
            </>
        )}
        {previousSentence && (
            <div>
                    <span className={'inline'}>
                      <p className={'bold'}>Previous guess was:</p>
                      <p className={isPreviousGuessCorrect ? 'correct' : 'incorrect'}>{isPreviousGuessCorrect ? 'Correct' : 'Incorrect'}</p>
                    </span>
              <span className={'inline'}>
                      <p className={'bold'}>Previous Sentence:</p>
                      <p>{previousSentence}</p>
                    </span><span className={'inline'}>
                      <p className={'bold'}>Previous sentence source:</p>
                      <p>{previousBook.title},</p>
                      <p className={'italic'}>{previousBook.author},</p>
                      <p className={`${previousBook.gender.toLowerCase() === 'male' ? 'male' : 'female'}`}>{previousBook.gender}</p>
                    </span>
            </div>
        )}
        {guesses >= 10 && <ScoreDisplay score={score}/>}
      </div>
  );
}

export default App;
