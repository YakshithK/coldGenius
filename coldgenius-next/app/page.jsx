'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Form from './components/Form';
import EmailOutput from './components/EmailOutput';
import CopyButton from './components/CopyButton';
import PastEmails from './components/PastEmails';
import { templates } from './data/templates';
import { subjectTemplates } from './data/subjects';

export default function Home() {
  const [emailData, setEmailData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  // Generate email from form data
  const generateEmail = (formData) => {
    // Get templates for the selected tone
    const toneTemplates = templates[formData.tone] || templates.friendly;
    const toneSubjects = subjectTemplates[formData.tone] || subjectTemplates.friendly;
    
    // Select random templates
    const randomTemplateIndex = Math.floor(Math.random() * toneTemplates.length);
    const randomSubjectIndex = Math.floor(Math.random() * toneSubjects.length);
    
    // Get the selected templates
    let emailTemplate = toneTemplates[randomTemplateIndex];
    let subjectTemplate = toneSubjects[randomSubjectIndex];
    
    // Replace placeholders
    const emailContent = emailTemplate
      .replace(/\[Role\]/g, formData.role)
      .replace(/\[Industry\]/g, formData.industry)
      .replace(/\[Offer\]/g, formData.offer);
      
    const subject = subjectTemplate
      .replace(/\[Role\]/g, formData.role)
      .replace(/\[Industry\]/g, formData.industry)
      .replace(/\[Offer\]/g, formData.offer);
    
    // Save to localStorage
    saveToHistory(formData, emailContent, subject);
    
    // Set the generated email data
    setEmailData({
      formData,
      emailContent,
      subject
    });
    
    // Show the results
    setShowResults(true);
    
    // Show success toast
    toast.success('Email generated successfully!');
  };
  
  // Save to history in localStorage
  const saveToHistory = (formData, emailContent, subject) => {
    try {
      const history = JSON.parse(localStorage.getItem('coldgenius-history')) || [];
      
      // Add the new email to the beginning of the array
      history.unshift({
        timestamp: new Date().toISOString(),
        formData,
        emailContent,
        subject
      });
      
      // Keep only the last 5 emails
      const trimmedHistory = history.slice(0, 5);
      
      // Save to localStorage
      localStorage.setItem('coldgenius-history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };
  
  // Regenerate email with the same form data
  const handleRegenerate = () => {
    if (emailData) {
      generateEmail(emailData.formData);
    }
  };
  
  // Go back to the form
  const handleBack = () => {
    setShowResults(false);
  };
  
  // Load a past email
  const handleSelectPastEmail = (pastEmail) => {
    setEmailData({
      formData: pastEmail.formData,
      emailContent: pastEmail.emailContent,
      subject: pastEmail.subject
    });
    setShowResults(true);
    toast.success('Past email loaded!');
  };
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg width="48" height="48" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <circle cx="20" cy="20" r="20" fill="currentColor"/>
              <rect x="8" y="14" width="24" height="15" fill="white" rx="2"/>
              <path d="M8 14 L20 20 L32 14" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
              <path d="M17 17 L14 23 L17 23 L17 29 L23 23 L20 23 L23 17 Z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="0.5"/>
            </svg>
            <h1 className="text-4xl font-bold">ColdGenius</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate personalized cold emails instantly</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className={`md:col-span-2 ${showResults ? 'hidden md:block' : ''}`}>
            <Form onSubmit={generateEmail} />
            
            <div className="md:hidden mt-8">
              {!showResults && <PastEmails onSelect={handleSelectPastEmail} />}
            </div>
          </div>
          
          <div className="md:col-span-1 hidden md:block">
            <PastEmails onSelect={handleSelectPastEmail} />
          </div>
          
          {showResults && (
            <div className="md:col-span-3 animate-fadeIn">
              <EmailOutput 
                subject={emailData?.subject} 
                emailContent={emailData?.emailContent} 
              />
              
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <CopyButton 
                  textToCopy={emailData?.emailContent} 
                  includeSubject={true}
                  subject={emailData?.subject}
                />
                
                <button 
                  onClick={handleRegenerate}
                  className="btn btn-outline flex-1 max-w-[200px]"
                >
                  Regenerate
                </button>
                
                <button 
                  onClick={handleBack}
                  className="btn bg-slate-200 hover:bg-slate-300 text-gray-800 flex-1 max-w-[200px]"
                >
                  Back to Form
                </button>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>ColdGenius &copy; 2025 - No signup, no login, just fast and simple</p>
        </footer>
      </div>
    </main>
  );
}
