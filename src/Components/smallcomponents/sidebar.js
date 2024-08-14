import React, { useEffect, useState, useContext } from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { FaBars, FaJava, FaPython, FaReact, FaCode, FaLeaf } from 'react-icons/fa';
import axios from 'axios';

const iconMap = {
    'Java': FaJava,
    'Python': FaPython,
    'React': FaReact,
    'C++': FaCode,
    'Spring': FaLeaf,
};

const Sidebar = () => {
    const { setQuizTopic } = useContext(QuizContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [quizTopics, setQuizTopics] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/getQuiz')
            .then(response => {
                const uniqueTopics = [...new Set(response.data.map(quiz => quiz.quizTopic))];
                setQuizTopics(uniqueTopics);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const updateQuizTopic = (topic) => {
            setQuizTopic(topic);
            navigate('/QuizPage');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h2>QUIZ</h2>
                </div>
                <ul className="sidebar-menu">
                    <div className='side-top'>
                        {quizTopics.map((topic, index) => {
                            const IconComponent = iconMap[topic] || FaCode; // Default icon if none is mapped
                            return (
                                <li key={index}>
                                    <div onClick={() => updateQuizTopic(topic)} className="sidebar-link">
                                        <IconComponent className="sidebar-icon" />
                                        <span className="sidebar-text">{topic}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
