import React, { useContext } from 'react';
import './AdaptList.css'; // New CSS file for the updated design
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../smallcomponents/Navbar';

const AdaptList = () => {
  const { setQuizTopic } = useContext(QuizContext);
  const navigate = useNavigate();

  const updateQuizTopic = (topic) => {
    switch(topic) {
      case 'JEE':
      case 'NEET':
      case 'GATE':
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
          {['JEE', 'NEET', 'GATE', 'GK'].map((topic) => (
            <div key={topic} className="nt-card" onClick={() => updateQuizTopic(topic)}>
              <div className="nt-card-content">
                <h2>{topic}</h2>
                <p>{`Challenge your ${topic === 'GK' ? 'general knowledge' : topic.toLowerCase()} skills`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdaptList;
