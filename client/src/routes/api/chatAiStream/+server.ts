import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import type { RequestHandler } from './$types';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || '',
});

export const POST: any = async ({ request }: any) => {
  try {
    // Extract the `prompt` from the body of the request
    const { messages } = await request.json();

    // Define your initial prompt
    const initialPrompt = "You are a helpful assistant. You also happen to be great at finding value. Give your opinion on the stock data provided to you.";

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        { role: "system", content: initialPrompt }, // Include your initial prompt as a system message
        ...messages.map((message: any) => ({ // Include user's messages
          content: message.content,
          role: message.role,
        }))
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Return the streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle any errors that occur during the execution of the endpoint
    console.error("An error occurred:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
