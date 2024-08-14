import React, { useEffect, useState, useContext } from 'react';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate ,useLocation} from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import QuizAssistant from '../partner/QuizAssistant'; // Import QuizAssistant

import './QuizAI.css';

const QuizAI = () => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [quesTop, setquesTop] = useState('////');
    const [error, setError] = useState('');
    const [mark, setMark] = useState(0);
    const [btnName, setBtnName] = useState("Submit");
    const [answerStatus, setAnswerStatus] = useState(null); 
    const [notification, setNotification] = useState('');
    const [focusTopics, setFocusTopics] = useState({});
    const [showAssistant, setShowAssistant] = useState(false);
    const { setAimark, setAifocTopic } = useContext(QuizContext);
    let navigate = useNavigate();
    const location = useLocation();
    const { topicarr, levelarr } = location.state || {};
    const tno=topicarr.length;
    const fetchData = async () => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyCojit0riyrgm5SO-6xbbjzH25QzIoh3Lw");
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: FunctionDeclarationSchemaType.OBJECT,
                        properties: {
                            question: { type: FunctionDeclarationSchemaType.STRING },
                            option1: { type: FunctionDeclarationSchemaType.STRING },
                            option2: { type: FunctionDeclarationSchemaType.STRING },
                            option3: { type: FunctionDeclarationSchemaType.STRING },
                            option4: { type: FunctionDeclarationSchemaType.STRING },
                            correctOption: { type: FunctionDeclarationSchemaType.INTEGER },
                            focustopic: { type: FunctionDeclarationSchemaType.STRING }
                        }
                    }
                }
            });
            let topic=topicarr[Math.floor(Math.random()*tno)]
            setquesTop(topic);
            const prompt = `Create a challenging and creative multiple-choice question with four options. The question should belong to the main topic of ${topic}, with a toughness level of ${levelarr}. Ensure the question requires critical thinking and problem-solving skills from the user. The focus topic should be automatically generated based on the content of the question. Include the correct answer as an integer (1-4).`;
            const result = await model.generateContent(prompt);
            const responseText = await result.response.text(); 
            //console.log("Raw response text:", responseText);
            const parsedResponse = JSON.parse(responseText);
            setQuestionData(parsedResponse);
            setCorrectAnswer(parsedResponse.correctOption);
        } 
        catch (error) 
        {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const handleDivClick = (id) => {
        if (btnName === "Submit") {
            setSelectedOption(id);
        }
    };

    const handleResult = () => {
        let cust;
        if (btnName === "Submit") {
            if (selectedOption === correctAnswer) {
                setAnswerStatus('correct');
                setNotification('Hooray! You are correct!');
                cust = 'correct';        
                setMark(mark + 1);    
            } 
            else {
                setAnswerStatus('wrong');
                setNotification('Let\'s try again.');
                cust = 'wrong';
            }
            setFocusTopics(prev => {
                const currentTopic = quesTop + " - " + questionData.focustopic;
                const newStats = { ...prev };

                if (!newStats[currentTopic]) {
                    newStats[currentTopic] = { totalQuestions: 0, correct: 0, wrong: 0 };
                }

                newStats[currentTopic].totalQuestions += 1;
                if (cust === 'correct') {
                    newStats[currentTopic].correct += 1;
                } else {
                    newStats[currentTopic].wrong += 1;
                }

                return newStats;
            });
            setBtnName("Next");
        } 
        else if (btnName === "Next") {
            setQuestionData(null);
            setSelectedOption(null);
            setCorrectAnswer(null);
            setAnswerStatus(null); 
            setNotification('');
            setBtnName("Submit");
            fetchData(); 
            setShowAssistant(false);
        }
    };

    const convertFocusTopicsToArray = (topics) => {
        return Object.keys(topics).map(topic => ({
            topic,
            totalQuestions: topics[topic].totalQuestions,
            correct: topics[topic].correct,
            wrong: topics[topic].wrong
        }));
    };

    const handleRes = () => {
        const focusTopicsArray = convertFocusTopicsToArray(focusTopics);
        setAimark(mark);
        setAifocTopic(focusTopicsArray);
        navigate('/AiResult');
    };

    if (error) {
        return (
            <>
                <p>{error}</p>
                <button onClick={() => fetchData()}>reload</button>
            </>
        );
    }

    if (!questionData) {
        return <p>Loading...</p>;
    }

    const getDivStyle = (id) => {
        if (btnName === "Submit") {
            return {
                backgroundColor: selectedOption === id ? '#360bab' : '#e0eafc',
                color: selectedOption === id ? '#fff' : '#000',
            };
        } 
        else if (answerStatus) {
            if (id === correctAnswer) {
                return {
                    backgroundColor: '#28a745', 
                    color: '#fff',
                };
            } 
            else if (id === selectedOption && answerStatus === 'wrong') {
                return {
                    backgroundColor: '#dc3545',
                    color: '#fff',
                };
            } 
        }
        return {}; 
    };

    const getCorrectAnswerText = () => {
        switch (correctAnswer) {
            case 1:
                return questionData.option1;
            case 2:
                return questionData.option2;
            case 3:
                return questionData.option3;
            case 4:
                return questionData.option4;
            default:
                return '';
        }
    };
    
    return (
        <div className={`AI-container`}>
            <div className='AI-main'>
                {notification && (
                    <div className='notification'>
                        {notification}
                    </div>
                )}
                <div className='Topic'>{quesTop}</div>
                <div className='Heading'>{questionData.focustopic}</div>
                <div className='diff'>{levelarr}</div>
                <div>
                <button className='toggle-assistant-button' onClick={() => setShowAssistant(!showAssistant)}>
                        {showAssistant ? "Hide Assistant" : "Show Assistant"}
                </button>
                <button className='toggle-assistant-button' onClick={() => handleRes()}>End Test</button>
                </div>
                <div className='AI_BigDiv'>
                    <div className='AI_BigDiv01'>
                        <div className='AI_BigDiv0101'>{questionData.question}</div>
                    </div>

                    <div className='AI_BigDiv02'>
                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(1)} 
                            onClick={() => handleDivClick(1)}
                        >
                            {questionData.option1}
                        </div>
                        
                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(2)} 
                            onClick={() => handleDivClick(2)}
                        >
                            {questionData.option2}
                        </div>
                        
                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(3)} 
                            onClick={() => handleDivClick(3)}
                        >
                            {questionData.option3}
                        </div>
                        
                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(4)} 
                            onClick={() => handleDivClick(4)}
                        >
                            {questionData.option4}
                        </div>
                    </div>
                    <button className='button-27' onClick={handleResult}>{btnName}</button>
                </div>
            </div>
            {showAssistant && (
                <div className='AI-assistant'>
                    <QuizAssistant 
                        question={questionData.question}
                        solution={getCorrectAnswerText()}  
                        resources={["we get it from DataBase , by analysing the topics of question"]}
                    />
                </div>
            )}
        </div>
    );
};

export default QuizAI;
