import { NextResponse } from 'next/server';
import { generateEmail } from '@/lib/gemini';
import { emailFormSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate inputs using Zod
    const result = emailFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: result.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { industry, role, offer, tone } = result.data;
    
    // Generate email with Gemini
    const generatedEmail = await generateEmail({
      industry,
      role,
      offer,
      tone,
    });
    
    // Return the generated email
    return NextResponse.json({ email: generatedEmail });
  } catch (error) {
    console.error('Error in email generation API:', error);
    
    // Determine the appropriate error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';
    
    // Return error response
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 