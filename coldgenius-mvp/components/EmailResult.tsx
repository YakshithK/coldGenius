'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';
import { 
  ClipboardDocumentIcon, 
  CheckIcon, 
  ArrowsPointingOutIcon, 
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '@/lib/store';
import { getEmailTips } from '@/lib/gemini';

const EmailResult: React.FC = () => {
  const { currentEmail, loading, error } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [isSubjectExpanded, setIsSubjectExpanded] = useState(false);
  const [showTips, setShowTips] = useState(true);

  // Parse email to extract subject and body
  const parseEmail = (email: string) => {
    const subjectMatch = email.match(/Subject: (.*?)(?:\n|$)/i);
    const subject = subjectMatch ? subjectMatch[1] : '';
    
    // Remove "Subject: " line to get the body
    const body = email.replace(/Subject: .*?(?:\n|$)/i, '').trim();
    
    return { subject, body };
  };

  const { subject, body } = currentEmail ? parseEmail(currentEmail) : { subject: '', body: '' };

  // Copy email to clipboard
  const copyToClipboard = () => {
    if (!currentEmail) return;
    
    navigator.clipboard.writeText(currentEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get email writing tips when email is generated
  useEffect(() => {
    if (currentEmail && !loading) {
      const fetchTips = async () => {
        try {
          // We'll get tips based on the most recent form submission
          // This is just a placeholder - in a real app we'd use the data from the form
          const newTips = await getEmailTips('tech', 'manager');
          setTips(newTips);
        } catch (err) {
          console.error('Failed to fetch email tips', err);
        }
      };
      
      fetchTips();
    }
  }, [currentEmail, loading]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-secondary-100 min-h-[300px] flex flex-col items-center justify-center"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
        <p className="mt-6 text-secondary-600 text-lg font-medium">Crafting your email...</p>
        <p className="mt-2 text-secondary-500 text-sm max-w-xs text-center">
          Using AI to generate a professional, engaging message tailored to your recipient
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-error-50 border border-error-200 text-error-800 px-6 py-5 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-error-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          Error
        </h3>
        <p>{error}</p>
        <p className="mt-3 text-sm">Please try again with different inputs or check your API key configuration.</p>
      </motion.div>
    );
  }

  if (!currentEmail) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-xl rounded-xl border border-secondary-100 overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 md:p-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-secondary-900 flex items-center">
            <span className="h-7 w-1.5 bg-success-500 rounded-full mr-3"></span>
            Your Email
          </h2>
          
          <div className="flex space-x-2">
            <motion.button
              onClick={copyToClipboard}
              className="inline-flex items-center px-3 py-2 border border-secondary-300 rounded-md text-sm font-medium text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-2 text-success-500" />
                  <span className="text-success-700">Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </motion.button>
          </div>
        </div>

        <motion.div 
          className="border border-secondary-200 rounded-lg overflow-hidden shadow-sm"
        >
          {subject && (
            <div 
              className={`bg-secondary-50 border-b border-secondary-200 px-5 py-4 transition-all ${isSubjectExpanded ? '' : 'cursor-pointer hover:bg-secondary-100'}`}
              onClick={() => !isSubjectExpanded && setIsSubjectExpanded(true)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-secondary-500 mb-1 font-medium">Subject</h3>
                  <p className={`font-medium text-secondary-900 ${isSubjectExpanded ? 'text-lg' : 'text-md'}`}>{subject}</p>
                </div>
                {!isSubjectExpanded && (
                  <ArrowsPointingOutIcon className="h-4 w-4 text-secondary-400" />
                )}
              </div>
            </div>
          )}
          
          <div className="p-5 bg-white">
            <h3 className="text-xs uppercase tracking-wider text-secondary-500 mb-2 font-medium">Message</h3>
            <div 
              className="prose prose-sm max-w-none text-secondary-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
            />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {tips.length > 0 && showTips && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-secondary-200 p-4 md:p-6 bg-gradient-to-r from-secondary-50 to-primary-50/30"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-secondary-900 flex items-center">
                <LightBulbIcon className="h-4 w-4 mr-2 text-primary-500" />
                Email Writing Tips
              </h3>
              <button 
                onClick={() => setShowTips(false)}
                className="text-xs text-secondary-500 hover:text-secondary-700"
              >
                Hide
              </button>
            </div>
            <ul className="space-y-2.5">
              {tips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start text-sm"
                >
                  <span className="text-primary-500 mr-2 text-lg leading-none font-medium">•</span>
                  <span className="text-secondary-700">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailResult; 