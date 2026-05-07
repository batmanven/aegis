import { NextResponse } from 'next/server';
import { getSurvivalAdvice } from '@/lib/ai/gemini';

export async function POST(req: Request) {
  try {
    const { query, context } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      // Mock response if no API key
      return NextResponse.json({ 
        text: "I am currently in OFFLINE mode (No API Key). Please follow standard emergency protocols: 1. Find high ground. 2. Conserve water. 3. Wait for rescue signals." 
      });
    }

    const advice = await getSurvivalAdvice(query, context);
    return NextResponse.json({ text: advice });
  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate survival advice' }, { status: 500 });
  }
}
