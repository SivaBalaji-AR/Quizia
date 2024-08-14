// src/openaiService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function fetchQuizQuestions(topic) {
  const prompt = `Generate 10 multiple-choice questions about ${topic}. Each question should be followed by four options and the correct answer. Each question should be structured with the question on the first line, followed by the four options, each on a new line, and the correct answer on the sixth line.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1500,
        n: 1,
        stop: ["\n\n"],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data); // Log the response data
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; // Re-throw error to handle it in the component
  }
}
