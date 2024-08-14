import React ,{useContext}from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { FaJava, FaPython, FaAndroid, FaTrophy, FaRobot, FaUserCircle,FaHome, FaQuestionCircle } from 'react-icons/fa';

const Navbar = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
    const updateQuizTopic = (topic) => {
        console.log(username);
        if (!username) {
          navigate('/');
        } else {
          switch(topic) {
            case 'profile':
              navigate('/profile');
              break;
            case 'result':
              navigate('/result');
              break;
            case 'Leader':
              navigate('/leaderboard');
              break;
            case 'form':
              navigate('/form');
              break;
            default:
              setQuizTopic(topic);
              navigate('/QuizPage');
              break;
          }
        }
      };
  return (
    <nav className="navbar">
          <ul>
            <li className="tooltip-container">
              <FaQuestionCircle className="navbar-icon" onClick={() => updateQuizTopic('Java')} />
              <div className="tooltip">Quiz</div>
            </li>
            <li className="tooltip-container">
              <FaHome className="navbar-icon" onClick={() => navigate('/')} />
              <div className="tooltip">Home</div>
            </li>
            <li className="tooltip-container">
              <FaTrophy className="navbar-icon" onClick={() => updateQuizTopic('Leader')} />
              <div className="tooltip">Leaderboard</div>
            </li>
            <li className="tooltip-container">
              <FaRobot className="navbar-icon" onClick={() => updateQuizTopic('form')} />
              <div className="tooltip">AI Quiz</div>
            </li>
            <li className="tooltip-container">
              <FaUserCircle className="navbar-icon" onClick={() => updateQuizTopic('profile')} />
              <div className="tooltip">Profile</div>
            </li>
          </ul>
        </nav>
  )
}

export default Navbar