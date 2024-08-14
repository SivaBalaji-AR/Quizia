import React, { useState } from 'react';
import Select from 'react-select';
import './QuizIntro.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../smallcomponents/Navbar';

const QuizIntro = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true);
  const navigate = useNavigate();

  const handleTopicChange = (selectedOptions) => {
    setSelectedTopics(selectedOptions || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quizTopics = selectedTopics.map(option => option.value);
    console.log('Quiz Topics:', quizTopics);
    console.log('Difficulty:', difficulty);
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
          <button type="submit" className="FRM-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
