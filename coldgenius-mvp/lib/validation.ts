import { z } from 'zod';

export const emailFormSchema = z.object({
  industry: z
    .string()
    .min(2, { message: 'Industry must be at least 2 characters' })
    .max(100, { message: 'Industry must be less than 100 characters' }),
  
  role: z
    .string()
    .min(2, { message: 'Role must be at least 2 characters' })
    .max(100, { message: 'Role must be less than 100 characters' }),
  
  offer: z
    .string()
    .min(5, { message: 'Offer must be at least 5 characters' })
    .max(200, { message: 'Offer must be less than 200 characters' }),
  
  tone: z
    .enum(['Professional', 'Friendly', 'Confident', 'Humble', 'Enthusiastic', 'Formal'], {
      errorMap: () => ({ message: 'Please select a valid tone' }),
    }),
});

export type EmailFormSchema = z.infer<typeof emailFormSchema>;

export const toneOptions = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Confident', label: 'Confident' },
  { value: 'Humble', label: 'Humble' },
  { value: 'Enthusiastic', label: 'Enthusiastic' },
  { value: 'Formal', label: 'Formal' },
]; 