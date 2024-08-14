// src/Quiz.js
import React, { useState } from 'react';
import { fetchQuizQuestions } from './openservice';

function Quiz() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const result = await fetchQuizQuestions(topic);
      setQuestions(result);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Quiz Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={handleInputChange}
        placeholder="Enter quiz topic"
      />
      <button onClick={generateQuestions} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Quiz Questions'}
      </button>
      <div>
        <p>{questions}</p>
      </div>
    </div>
  );
}

export default Quiz;
