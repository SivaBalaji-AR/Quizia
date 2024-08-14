import React, { useContext, useEffect, useState } from 'react';
import './Quizdisplay.css';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import '../Home/Button.css';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import Sidebar from '../smallcomponents/sidebar';
import Navbar from '../smallcomponents/Navbar';

const Quizdisplay = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { quizTopic, setQuizName, setQuizId } = useContext(QuizContext);
    const navigate = useNavigate();

    const updateQuizName = (title, Id) => 
    {
        setQuizName(title);
        setQuizId(Id);
        navigate('/Quiz');
    };

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/getQuiz')
            .then(response => setQuizzes(response.data.filter(quiz => quiz.quizTopic === quizTopic)))
            .catch(error => console.error('Error:', error));
    }, [quizTopic]);

    return (
        <>
        <div className="quiz-display-container">
            <div><Navbar/></div>
            <Sidebar/>
            <h1 className={`quiz-page-title`}>{quizTopic}</h1>
            <div className={`quiz-grid`}>
                <div className="quiz-grid-container">
                    {quizzes.map((quiz, index) => (
                        <div className="quiz-card" key={index}>
                            <img src={QICON} alt="Quiz Icon" className="quiz-card-image" />
                            <div className="quiz-card-content">
                                <h3 className="quiz-card-title">{quiz.quizTopic}</h3>
                                <h3 className="quiz-card-description">{quiz.quizName}</h3>
                                <div className="quiz-card-footer">
                                    <button onClick={() => updateQuizName(quiz.quizName, quiz.quizId)} className="quiz-card-button">Start Quiz</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Quizdisplay;
