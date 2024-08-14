import React, { useEffect, useContext, useState } from 'react';
import CreateQuiz from '../Create/CreateQuiz';
import { QuizContext } from '../context/QuizContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const [mark, setMark] = useState(0);
  const [index, setIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [choosed, setChoosed] = useState(null);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [buttonName, setButtonName] = useState("Submit");
  const [isSubmitMode, setIsSubmitMode] = useState(true);
  const [correctOption, setCorrectOption] = useState(null);
  const [correctFocusTopic, setCorrectFocusTopic] = useState({});
  const { quizName, quizTopic, setMark: setContextMark, setWrongTopic, quizId } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/quiz/getQuiz')
      .then(response => {
        const filteredQuiz = response.data.find(quiz => quiz.quizId === quizId);
        if (filteredQuiz) {
          setQuestionList(filteredQuiz.questions);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [quizId]);

  const qno = questionList.length;

  const handleSelectedCheck = (id) => {
    setChoosed(id);
  };

  const handleNext = () => {
    if (isSubmitMode) {
      if (choosed === null) {
        alert("Choose an option");
        return;
      }

      const currentQuestion = questionList[index];
      const focusTopic = currentQuestion.focusTopic;

      if (choosed === currentQuestion.correctOption) {
        setMark((prev) => prev + 1);
        setCorrectFocusTopic(prev => ({
          ...prev,
          [focusTopic]: (prev[focusTopic] || 0) + 1
        }));
      }

      setCorrectOption(currentQuestion.correctOption);
      setIsSubmitMode(false);
      setButtonName("Next");
    } else {
      setResetCheckbox(prev => !prev);

      const newIndex = index + 1;
      setIndex(newIndex);

      if (newIndex === qno - 1) 
      {
        setButtonName("Submit");
      } 
      else if (newIndex === qno-1) 
      {
        setButtonName("See Result");
      } 
      else
      {
        setButtonName("Submit");
      }

      if (newIndex === qno) {
        setTimeout(() => {
          const topicCounts = questionList.reduce((acc, question) => {
            const topic = question.focusTopic;
            if (topic) {
              if (!acc.totalQuestions[topic]) {
                acc.totalQuestions[topic] = 0;
              }
              acc.totalQuestions[topic]++;
            }
            return acc;
          }, { totalQuestions: {} });

          const aggregatedCorrectFocusTopic = Object.keys(topicCounts.totalQuestions).reduce((acc, topic) => {
            acc[topic] = correctFocusTopic[topic] || 0;
            return acc;
          }, {});

          const aggregatedIncorrectFocusTopic = Object.keys(topicCounts.totalQuestions).reduce((acc, topic) => {
            const totalQuestions = topicCounts.totalQuestions[topic] || 0;
            const correctAnswers = aggregatedCorrectFocusTopic[topic] || 0;
            acc[topic] = totalQuestions - correctAnswers;
            return acc;
          }, {});

          setContextMark(mark);
          // setWrongTopic(Object.keys(aggregatedIncorrectFocusTopic).map(topic => ({
          //   topic,
          //   totalQuestions: topicCounts.totalQuestions[topic],
          //   totalWrong: aggregatedIncorrectFocusTopic[topic]
          // })));

          navigate('/result', {
            state: {
              quizId: quizId,
              correctFocusTopic: aggregatedCorrectFocusTopic,
              incorrectFocusTopic: aggregatedIncorrectFocusTopic
            }
          });
        }, 0);
      }

      setChoosed(null);
      setIsSubmitMode(true);
    }
  };

  return (
    <div>
      <CreateQuiz
        quiz_id={quizId}
        quizName={quizName}
        quizTopic={quizTopic}
        sentence1={index + 1 + ". " + questionList[index]?.question}
        option1={questionList[index]?.option1}
        option2={questionList[index]?.option2}
        option3={questionList[index]?.option3}
        option4={questionList[index]?.option4}
        onCheckboxChange={handleSelectedCheck}
        resetCheckbox={resetCheckbox}
        onNextClick={handleNext}
        buttonName={buttonName}
        correctOption={correctOption}
        isSubmitMode={isSubmitMode}
      />
    </div>
  );
};

export default QuestionList;
