import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { Link, useLocation } from 'react-router-dom';
import './ResultPage.css';
import Navbar from '../smallcomponents/Navbar';

function ResultPage() {
  const { mark, quizTopic, quizName, username } = useContext(QuizContext);
  const location = useLocation();
  const { quizId, correctFocusTopic } = location.state || {};
  const [wrongTopics, setWrongTopics] = useState([]);

  useEffect(() => {
    const resDet = {
      participant: username,
      mark: mark,
      qname: quizName,
      qtopic: quizTopic,
      quizId: quizId
    };

    axios.post('http://localhost:8080/result/insertResult', resDet)
      .then(response => {
        console.log("result uploaded");
      })
      .catch(error => {
        alert('Result error:', error);
      });

    // Update the wrong topics count based on the fetched quiz data
    axios.get('http://localhost:8080/quiz/getQuiz')
      .then(response => {
        const filteredQuiz = response.data.find(quiz => quiz.quizId === quizId);
        if (filteredQuiz) {
          const topicCounts = {};

          filteredQuiz.questions.forEach(question => {
            const topic = question.focusTopic;
            if (topic) {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
          });

          const topicsArray = Object.keys(topicCounts).map(topic => ({
            topic,
            totalQuestions: topicCounts[topic],
            totalCorrect: correctFocusTopic[topic] || 0
          }));

          setWrongTopics(topicsArray);
        }
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [username, mark, quizName, quizTopic, quizId, correctFocusTopic]);

  return (
    <div style={{ background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)', height: '100vh' }}>
    <div className="result-container">
      <div style={{marginLeft:"39%"}}><Navbar/></div>
      <h2 className="result-header">Result Page</h2>
      <div className="result-info">
        <ul>
          <li>Quiz Topic: {quizTopic}</li>
          <li>Quiz Name: {quizName}</li>
          <li>You Scored: {mark}</li>
        </ul>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Focus Topic</th>
            <th>Total Questions</th>
            <th>No of Correct</th>
            <th>No of Wrong</th>
          </tr>
        </thead>
        <tbody>
          {wrongTopics.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.topic}</td>
              <td>{quiz.totalQuestions}</td>
              <td>{quiz.totalCorrect}</td>
              <td>{quiz.totalQuestions - quiz.totalCorrect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ResultPage;
