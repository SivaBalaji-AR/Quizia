import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';
import Navbar from '../smallcomponents/Navbar';

function ResultPage() {
  const { mark, quizTopic, quizName, username } = useContext(QuizContext);
  const location = useLocation();
  const { quizId, correctFocusTopic } = location.state || {};
  const [wrongTopics, setWrongTopics] = useState([]);

  useEffect(() => {
    console.log('Component mounted');
    
    // Log quizId to verify its presence and type
    console.log('quizId from state:', quizId, typeof quizId);

    // Prepare result details to be posted
    const resDet = {
      participant: username,
      mark: mark,
      qname: quizName,
      qtopic: quizTopic,
      quizId: quizId
    };

    // Post the result details
    axios.post(`${process.env.REACT_APP_API_URL}/result`, resDet)
      .then(response => {
        console.log("Result uploaded");
      })
      .catch(error => {
        alert('Result error:', error);
      });

    // Fetch quiz data to analyze wrong topics
    axios.get(`${process.env.REACT_APP_API_URL2}/Questions`)
      .then(response => {
        console.log('API Response:', response.data); // Log the entire API response
        
        // Filter quiz data by quizId without converting types
        const filteredQuiz = response.data.filter(question => question.quizId === Number(quizId));
        console.log('Filtered Quiz:', filteredQuiz); // Log the filtered quiz

        if (filteredQuiz) {
          const topicCounts = {};

          filteredQuiz.map(question => {
            const topic = question.focusTopic;
            if (topic) {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
          });

          // Prepare the topics array for display
          const topicsArray = Object.keys(topicCounts).map(topic => ({
            topic,
            totalQuestions: topicCounts[topic],
            totalCorrect: correctFocusTopic[topic] || 0
          }));

          console.log('Topics Array:', topicsArray); // Log the topics array
          setWrongTopics(topicsArray);
        } else {
          console.warn('No quiz found with quizId:', quizId); // Warn if no quiz is found
        }
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [username, mark, quizName, quizTopic, quizId, correctFocusTopic]);

  return (
    <div style={{ background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)', height: '100vh' }}>
      <div className="result-container">
        <div style={{ marginLeft: "39%" }}><Navbar /></div>
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
            {wrongTopics.length > 0 ? (
              wrongTopics.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.topic}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.totalCorrect}</td>
                  <td>{quiz.totalQuestions - quiz.totalCorrect}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;
