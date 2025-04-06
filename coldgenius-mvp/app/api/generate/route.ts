import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { industry, role, offer, tone } = await req.json();

  if (!industry || !role || !offer || !tone) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const prompt = `
Write a cold email targeting a ${role} in the ${industry} industry. 
The sender is offering ${offer}. 
The tone should be ${tone}. 
Keep it under 120 words. Make it personal, clear, and actionable.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-0125-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    const emailContent = completion.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ email: emailContent });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 });
  }
}
