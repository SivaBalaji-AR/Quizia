import React, { useState } from 'react';
import Select from 'react-select';
import './QuizIntro.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../smallcomponents/Navbar';

const QuizIntro = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true);
  const navigate = useNavigate();

  const handleTopicChange = (selectedOptions) => {
    setSelectedTopics(selectedOptions || []);
  };

  const handleApiKeyChange = (e) => {
    setGeminiApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!geminiApiKey) {
      alert('Gemini API key is required.');
      return;
    }

    const quizTopics = selectedTopics.map(option => option.value);
    console.log('Quiz Topics:', quizTopics);
    console.log('Difficulty:', difficulty);
    console.log('Gemini API Key:', geminiApiKey);

    // Save the Gemini API key in local storage
    localStorage.setItem('geminiApiKey', geminiApiKey);

    navigate('/AI', { state: { topicarr: quizTopics, levelarr: difficulty } });
  };

  const closeDisclaimer = () => {
    setIsDisclaimerVisible(false);
  };

  const topicOptions = [
    { value: 'CPP', label: 'CPP' },
    { value: 'JAVA', label: 'JAVA' },
    { value: 'PYTHON', label: 'PYTHON' },
    { value: 'APTITUDE', label: 'APTITUDE' },
  ];

  return (
    <div className='FRM-Quiz-Intro'>
      <div className="FRM-container">
        {isDisclaimerVisible && (
          <div className="FRM-disclaimer">
            <p>Your Gemini API key is only stored locally on your device and is never shared with anyone. It is used to access enhanced features in the quiz application.</p>
            <button onClick={closeDisclaimer} className="FRM-disclaimer-close">Close</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="FRM-form">
          <div className="FRM-form-group">
            <label htmlFor="quizTopic" className="FRM-label">Quiz Topics:</label>
            <Select
              id="quizTopic"
              isMulti
              options={topicOptions}
              value={selectedTopics}
              onChange={handleTopicChange}
              className="FRM-select"
            />
          </div>
          <div className="FRM-form-group">
            <label htmlFor="difficulty" className="FRM-label">Difficulty:</label>
            <select
              id="difficulty"
              className="FRM-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="FRM-form-group">
            <label htmlFor="geminiApiKey" className="FRM-label">Gemini API Key:</label>
            <input
              type="text"
              id="geminiApiKey"
              className="FRM-input"
              value={geminiApiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter your Gemini API key"
              required
            />
          </div>
          <button type="submit" className="FRM-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
