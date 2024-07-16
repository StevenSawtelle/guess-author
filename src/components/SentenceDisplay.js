import React from 'react';

const SentenceDisplay = ({ sentence, author }) => (
    <div>
        <p>"{sentence}"</p>
        <p>- {author}</p>
    </div>
);

export default SentenceDisplay;
