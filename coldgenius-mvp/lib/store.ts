import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EmailHistory {
  id: string;
  industry: string;
  role: string;
  offer: string;
  tone: string;
  email: string;
  createdAt: Date;
}

export interface EmailFormData {
  industry: string;
  role: string;
  offer: string;
  tone: string;
}

interface AppState {
  emails: EmailHistory[];
  loading: boolean;
  currentEmail: string | null;
  error: string | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  addEmail: (formData: EmailFormData, email: string) => void;
  setCurrentEmail: (email: string | null) => void;
  setError: (error: string | null) => void;
  deleteEmail: (id: string) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      emails: [],
      loading: false,
      currentEmail: null,
      error: null,
      
      setLoading: (loading) => set({ loading }),
      
      addEmail: (formData, email) => set((state) => ({
        emails: [
          {
            id: crypto.randomUUID(),
            ...formData,
            email,
            createdAt: new Date(),
          },
          ...state.emails,
        ].slice(0, 50), // Keep only the last 50 emails
        currentEmail: email,
      })),
      
      setCurrentEmail: (email) => set({ currentEmail: email }),
      
      setError: (error) => set({ error }),
      
      deleteEmail: (id) => set((state) => ({
        emails: state.emails.filter((email) => email.id !== id),
      })),
      
      clearHistory: () => set({ emails: [] }),
    }),
    {
      name: 'coldgenius-storage',
      partialize: (state) => ({ emails: state.emails }),
    }
  )
); 