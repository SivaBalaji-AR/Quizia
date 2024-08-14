
import React, { useState, useContext } from 'react';
import './HomeComponent.css';
import QICON from '../../Files/QICON.jpg';
import JICON from '../../Files/Java.png';
import PYTHON from '../../Files/PHYTHON.jpg';
import REACT from '../../Files/React.jpg';
import SPRING from '../../Files/Spring.png';
import CPP from '../../Files/CPP.png';
import FB from '../../Files/FB.png';
import IG from '../../Files/instagram.png';
import X from '../../Files/twitter.png';
import { QuizContext } from '../context/Quizcontext';
import { useNavigate } from 'react-router-dom';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import { FaJava, FaPython, FaReact, FaTrophy, FaRobot, FaUserCircle } from 'react-icons/fa';

const HomeComponent = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => {
    console.log(username);
    if (!username) {
      setShowLoginModal(true);
      console.log("vanakam");
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
        case 'AI':
          navigate('/AI');
          break;
        default:
          setQuizTopic(topic);
          navigate('/QuizPage');
          break;
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="home-container">
      <div className='background'>
        <nav className="navbar">
          <img src={QICON} alt="QICON" className="navbar-image" />
          <ul>
            <li className="tooltip-container">
              <FaJava className="navbar-icon" onClick={() => updateQuizTopic('Java')} />
              <div className="tooltip">Java</div>
            </li>
            <li className="tooltip-container">
              <FaPython className="navbar-icon" onClick={() => updateQuizTopic('Python')} />
              <div className="tooltip">Python</div>
            </li>
            <li className="tooltip-container">
              <FaReact className="navbar-icon" onClick={() => updateQuizTopic('React')} />
              <div className="tooltip">React</div>
            </li>
            <li className="tooltip-container">
              <FaTrophy className="navbar-icon" onClick={() => updateQuizTopic('Leader')} />
              <div className="tooltip">Leaderboard</div>
            </li>
            <li className="tooltip-container">
              <FaRobot className="navbar-icon" onClick={() => updateQuizTopic('AI')} />
              <div className="tooltip">AI Quiz</div>
            </li>
            <li className="tooltip-container">
              <FaUserCircle className="navbar-icon" onClick={() => updateQuizTopic('profile')} />
              <div className="tooltip">Profile</div>
            </li>
          </ul>
        </nav>

        <div className='home-content'>
          <h1>Welcome to the Quiz Master!</h1>
          <p>Challenge yourself with our quizzes and enhance your knowledge. Let's make learning fun!</p>
        </div>

        <div className='quiz-gridh'>
          <div className='quiz-cardh' onClick={() => updateQuizTopic('Java')}>
            <h1>Java</h1>
            <h3>Test your Java skills</h3>
          </div>
          <div className='quiz-cardh' onClick={() => updateQuizTopic('Python')}>
            <h1>Python</h1>
            <h3>Test your Python skills</h3>
          </div>
          <div className='quiz-cardh' onClick={() => updateQuizTopic('React')}>
            <h1>React</h1>
            <h3>Test your React skills</h3>
          </div>
          <div className='quiz-cardh' onClick={() => updateQuizTopic('Spring')}>
            <h1>Spring</h1>
            <h3>Test your Spring skills</h3>
          </div>
          <div className='quiz-cardh' onClick={() => updateQuizTopic('C++')}>
            <h1>C++</h1>
            <h3>Test your C++ skills</h3>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h2>About Us</h2>
              <p>We are dedicated to providing the best quiz platform to enhance your skills in a variety of subjects.</p>
            </div>
            <div className="footer-section">
              <h2>Contact Us</h2>
              <p>Email: support@quizmaster.com</p>
              <p>Phone: +123 456 7890</p>
            </div>
            <div className="footer-section">
              <h2>Follow Us</h2>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <img src={FB} alt="Facebook" />
                </a>
                <a href="#" className="social-icon">
                  <img src={IG} alt="Instagram" />
                </a>
                <a href="#" className="social-icon">
                  <img src={X} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Quiz Master. All rights reserved.</p>
          </div>
        </footer>
      </div>
        <Modal show={showLoginModal} onClose={handleLoginClose}>
          <LoginComponent onClose={handleLoginClose} />
        </Modal>
    </div>
  );
};

export default HomeComponent;