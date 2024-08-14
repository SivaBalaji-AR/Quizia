import React, { useState, useContext } from 'react';
import axios from 'axios';
import './NewQuiz.css';
import { FaTrash, FaEdit, FaHome } from 'react-icons/fa';
import { QuizContext } from '../context/QuizContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../smallcomponents/Navbar'

const NewQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [focusTopic, setFocusTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const { username } = useContext(QuizContext); // Get username from UserContext
  const navigate = useNavigate(); // Initialize navigate

  // Set creatorName from UserContext
  React.useEffect(() => {
    if (username) {
      setCreatorName(username);
    }
  }, [username]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    clearError('options');
  };

  const handleRadioClick = (index) => {
    setCorrectOptionIndex((prevIndex) => (prevIndex === index ? null : index));
    clearError('correctOption');
  };

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!question) newErrors.question = 'Question is required';
    if (options.some(option => !option)) newErrors.options = 'All options are required';
    if (correctOptionIndex === null) newErrors.correctOption = 'Choose the correct option';
    if (!focusTopic) newErrors.focusTopic = 'Focus Topic is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newQuestion = { 
      question, 
      option1: options[0], 
      option2: options[1], 
      option3: options[2], 
      option4: options[3], 
      correctOption: correctOptionIndex + 1, 
      focusTopic 
    };
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectOptionIndex(null);
    setFocusTopic('');
  };

  const handleEdit = index => {
    const questionToEdit = questions[index];
    setQuestion(questionToEdit.question);
    setOptions([questionToEdit.option1, questionToEdit.option2, questionToEdit.option3, questionToEdit.option4]);
    setCorrectOptionIndex(questionToEdit.correctOption - 1);
    setFocusTopic(questionToEdit.focusTopic);
    setEditIndex(index);
    // Scroll to the question input section
    document.querySelector('.newquiz-question-card').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = index => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleClear = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectOptionIndex(null);
    setFocusTopic('');
    setEditIndex(null);
  };

  const handlePublish = () => {
    const newErrors = {};
    if (!quizName) newErrors.quizName = 'Quiz Name is required';
    if (!quizTopic) newErrors.quizTopic = 'Quiz Topic is required';
    if (!creatorName) newErrors.creatorName = 'Creator Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const quizData = {
      quizName,
      quizTopic,
      creatorName,
      questions
    };

    axios.post('http://localhost:8080/quiz/insertQuiz', quizData)
      .then(response => {
        alert('Quiz published successfully!');
        setQuizName('');
        setQuizTopic('');
        setCreatorName('');
        setQuestions([]);
      })
      .catch(error => {
        console.error('There was an error publishing the quiz!', error);
      });
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to home
  };

  return (
    <div className='entirePage'>
      <div style={{marginLeft:"39%"}}><Navbar/></div>
      <div className="newquiz-quiz-creator">
      <div className="newquiz-header">
         <h1>Create a Quiz</h1>
        </div>
        <div className="newquiz-form-group">
          <label>Quiz Topic:</label>
          <input
            type="text"
            value={quizTopic}
            onChange={e => {
              setQuizTopic(e.target.value);
              clearError('quizTopic');
            }}
            onFocus={() => clearError('quizTopic')}
          />
          {errors.quizTopic && <div className="newquiz-error">{errors.quizTopic}</div>}
        </div>
        <div className="newquiz-form-group">
          <label>Quiz Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={e => {
              setQuizName(e.target.value);
              clearError('quizName');
            }}
            onFocus={() => clearError('quizName')}
          />
          {errors.quizName && <div className="newquiz-error">{errors.quizName}</div>}
        </div>
        <div className="newquiz-form-group">
          <label>Creator Name:</label>
          <input
            type="text"
            value={creatorName}
            readOnly
          />
        </div>
        <div className="newquiz-question-card">
          <div className="newquiz-form-group">
            <label>Question:</label>
            <input
              type="text"
              value={question}
              onChange={e => {
                setQuestion(e.target.value);
                clearError('question');
              }}
              onFocus={() => clearError('question')}
            />
            {errors.question && <div className="newquiz-error">{errors.question}</div>}
          </div>
          <div className="newquiz-form-group">
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index} className="newquiz-option-input">
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctOptionIndex === index}
                  onChange={() => handleRadioClick(index)}
                  className={correctOptionIndex === index ? 'newquiz-selected' : ''}
                />
                <input
                  type="text"
                  value={option}
                  onChange={e => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index+1}`}
                  onFocus={() => clearError('options')}
                />
              </div>
            ))}
            {errors.options && <div className="newquiz-error">{errors.options}</div>}
            {errors.correctOption && <div className="newquiz-error">{errors.correctOption}</div>}
            <div className="newquiz-form-group">
              <label>Focus Topic:</label>
              <input
                type="text"
                value={focusTopic}
                onChange={e => {
                  setFocusTopic(e.target.value);
                  clearError('focusTopic');
                }}
                onFocus={() => clearError('focusTopic')}
              />
              {errors.focusTopic && <div className="newquiz-error">{errors.focusTopic}</div>}
            </div>
          </div>
          <div className="newquiz-form-buttons">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>
        <div className="newquiz-questions-list">
          <h2>Questions</h2>
          {questions.map((q, index) => (
            <div key={index} className="newquiz-question-card">
              <p><strong>Q{index + 1}:</strong> {q.question}</p>
              <ul>
                {[
                  q.option1,
                  q.option2,
                  q.option3,
                  q.option4
                ].map((option, i) => (
                  <li key={i} className={i === q.correctOption - 1 ? 'newquiz-correct-option' : ''}>
                    Option {i + 1}: {option} {i === q.correctOption - 1 && <strong>(Correct Option)</strong>}
                  </li>
                ))}
              </ul>
              <div className="newquiz-question-actions">
                <FaEdit className="newquiz-edit-icon" onClick={() => handleEdit(index)} />
                <FaTrash className="newquiz-delete-icon" onClick={() => handleDelete(index)} />
              </div>
            </div>
          ))}
        </div>
        <div className="newquiz-publish-button">
          <button onClick={handlePublish} className="newquiz-publish-button">Publish</button>
        </div>
      </div>
    </div>
  );
};

export default NewQuiz;