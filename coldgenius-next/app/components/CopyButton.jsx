'use client';

import { useState } from 'react';

export default function CopyButton({ textToCopy, includeSubject = false, subject = '' }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      // Format the text to copy (include subject if requested)
      const fullText = includeSubject && subject 
        ? `Subject: ${subject}\n\n${textToCopy}`
        : textToCopy;
        
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };
  
  return (
    <button 
      onClick={handleCopy}
      className={`btn ${copied ? 'bg-green-600 hover:bg-green-700 text-white' : 'btn-secondary'} flex items-center justify-center gap-2 py-3 px-6 transition-all duration-300 max-w-[200px] flex-1`}
      disabled={copied}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Copied!</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          <span className="font-medium">Copy Email</span>
        </>
      )}
    </button>
  );
}
