import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './QuizAssistant.css';

const QuizAssistant = ({ question, solution, resources }) => {
    const [userPrompt, setUserPrompt] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [error, setError] = useState('');
    const [resourceSuggested, setResourceSuggested] = useState(false);
    const [showResources, setShowResources] = useState(false);
    //console.log("Solutioin:"+solution);
    const fetchHint = async () => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyC2Qi6RuTrJybr6hMWBcuX345v2PHFb1sw");
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: 'object',
                        properties: {
                            hint: { type: 'string' },
                            conversation: { type: 'array', items: { type: 'string' } }
                        }
                    }
                }
            });

            const prompt = `Based on the question: "${question}" and the solution: "${solution}", 
            the user asks: "${userPrompt}". 
            Provide a slight hint to help them without giving the answer directly. 
            Previous hints: ${conversationHistory.map(entry => entry.hint).join(', ')}`;

            const result = await model.generateContent(prompt);
            const responseText = await result.response.text(); 
            const parsedResponse = JSON.parse(responseText);

            const newEntry = {
                userPrompt,
                hint: parsedResponse.hint,
            };

            setConversationHistory([...conversationHistory, newEntry]);
            setUserPrompt('');

            const hasBasicUnderstanding = Array.isArray(parsedResponse.conversation) && 
                parsedResponse.conversation.some(msg => msg.includes('understand') || msg.includes('concept'));

            if (!hasBasicUnderstanding) {
                setResourceSuggested(true);
            }

        } catch (error) {
            console.error('Error fetching hint:', error);
            setError('Failed to fetch hint. Please try again later.');
        }
    };

    return (
        <div className='assistant-container'>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className='chat-container'>
                    <h2>{question}</h2>
                    {conversationHistory.map((entry, index) => (
                        <div key={index}>
                            <div className='chat-bubble user-bubble'>
                                <p>{entry.userPrompt===""?"Give me a hint":entry.userPrompt}</p>
                            </div>
                            <div className='chat-bubble assistant-bubble'>
                                <p>{entry.hint}</p>
                            </div>
                        </div>
                    ))}
                    <input 
                        type="text" 
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        placeholder="Ask for a hint..." 
                        className='user-prompt-input'
                    />
                    <button onClick={fetchHint} className='fetch-hint-button'>Get Hint</button>

                    {resourceSuggested && (
                        <button onClick={() => setShowResources(!showResources)} className='show-resources-button'>
                            {!showResources ? "Show" : "Hide"} Resources
                        </button>
                    )}

                    {showResources && (
                        <div className='resource-suggestion'>
                            <p>It seems like you might need more help with basic or key concepts. Here are some resources to assist you:</p>
                            <ul>
                                {resources.map((resource, index) => (
                                    <li key={index}>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <strong>{resource}</strong>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizAssistant;
