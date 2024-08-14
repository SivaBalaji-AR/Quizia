import React, { useState, useContext } from 'react';
import './AdaptList.css'; // New CSS file for the updated design
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../smallcomponents/Navbar';

const AdaptList = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  

  const updateQuizTopic = (topic) => 
  {
      switch(topic) 
      {
        case 'JEE':
          navigate('/Adapt', {state: {topic}});
          break;
        case 'NEET':
          navigate('/Adapt', {state: {topic}});
          break;
        case 'GATE':
          navigate('/Adapt', {state: {topic}});
          break;
        case 'GK':
          navigate('/Adapt', {state: {topic}});
          break;
        default:
          setQuizTopic(topic);
          navigate('/QuizPage');
          break;
      }
  };

  return (
    <div className="nt-home-container">
      <Navigationbar />
      <div className="nt-content">
        <h1 className="nt-title">Choose Your Quiz Topic</h1>
        <div className="nt-grid">
          <div className="nt-card" onClick={() => updateQuizTopic('JEE')}>
            <div className="nt-card-content">
              <h2>JEE</h2>
              <p>Challenge your engineering instincts</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('NEET')}>
            <div className="nt-card-content">
              <h2>NEET</h2>
              <p>Test your medical knowledge</p>
            </div>
          </div>
    
          <div className="nt-card" onClick={() => updateQuizTopic('GATE')}>
            <div className="nt-card-content">
              <h2>GATE</h2>
              <p>Push your engineering limits</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('GK')}>
            <div className="nt-card-content">
              <h2>General knowledge</h2>
              <p>Expand your horizons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AdaptList;