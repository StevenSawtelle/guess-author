import React from 'react';

const GuessButtons = ({ onGuess }) => (
    <div className={'guess-buttons'}>
        <button className={'male'} onClick={() => onGuess('male')}>Male</button>
        <button className={'female'} onClick={() => onGuess('female')}>Female</button>
    </div>
);

export default GuessButtons;
