'use client';

import { useState, useEffect } from 'react';

export default function PastEmails({ onSelect }) {
  const [pastEmails, setPastEmails] = useState([]);
  
  useEffect(() => {
    // Load past emails from localStorage on component mount
    const loadPastEmails = () => {
      try {
        const storedEmails = localStorage.getItem('coldgenius-history');
        if (storedEmails) {
          setPastEmails(JSON.parse(storedEmails));
        }
      } catch (error) {
        console.error('Error loading past emails:', error);
      }
    };
    
    loadPastEmails();
  }, []);
  
  if (pastEmails.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-6 mx-auto">
      <h2 className="text-xl font-semibold mb-5 text-center">Past Emails</h2>
      
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
        {pastEmails.map((item, index) => (
          <div 
            key={index} 
            className="border border-slate-200 rounded-lg p-4 hover:bg-slate-100 cursor-pointer transition-colors hover:shadow-sm"
            onClick={() => onSelect(item)}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="font-medium text-primary">{item.formData.industry} - {item.formData.role}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.formData.offer.substring(0, 80)}{item.formData.offer.length > 80 ? '...' : ''}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{item.formData.tone}</span>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
