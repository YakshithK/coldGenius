import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the Gemini Pro model
const geminiProModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface EmailGenerationParams {
  industry: string;
  role: string;
  offer: string;
  tone: string;
}

export async function generateEmail(params: EmailGenerationParams): Promise<string> {
  const { industry, role, offer, tone } = params;
  
  // Build a carefully crafted prompt for Gemini
  const prompt = `
Write a concise, high-quality cold email for someone in the ${industry} industry.
This email is for a ${role}.
I'm offering: ${offer}
The tone should be: ${tone}

The email must:
- Be under 120 words
- Have a clear, attention-grabbing subject line
- Include a personalized opening that demonstrates understanding of their role/industry
- Clearly explain the value proposition without being pushy
- End with a specific, low-commitment call to action
- Feel authentic and human, not robotic or overly sales-y
- Format the email with proper spacing and structure

Subject line format: "Subject: [Your subject here]"
Then skip a line and write the email body.
`;

  try {
    // Generate content with Gemini Pro
    const result = await geminiProModel.generateContent(prompt);
    const text = result.response.text();
    
    if (!text) {
      throw new Error('Failed to generate email content');
    }
    
    return text.trim();
  } catch (error) {
    console.error('Error generating email with Gemini:', error);
    throw new Error('Failed to generate email. Please try again later.');
  }
}

export async function getEmailTips(industry: string, role: string): Promise<string[]> {
  const prompt = `
Provide 5 concise, specific tips for writing effective cold emails to ${role}s in the ${industry} industry.
Each tip should be:
- Specific to this role and industry
- Under 80 characters
- Actionable advice
- Not generic

Format as a simple list, one tip per line, no numbering or bullets.
`;

  try {
    const result = await geminiProModel.generateContent(prompt);
    const text = result.response.text();
    
    if (!text) {
      return [];
    }
    
    // Split the response by new lines and filter out empty lines
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 5); // Ensure we only get 5 tips max
  } catch (error) {
    console.error('Error generating email tips:', error);
    return [];
  }
} 