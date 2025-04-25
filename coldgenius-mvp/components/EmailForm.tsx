'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailFormSchema, type EmailFormSchema, toneOptions } from '@/lib/validation';
import { ExclamationCircleIcon, LightBulbIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const FormField = ({ 
  label, 
  id, 
  error, 
  children,
  tooltip,
}: { 
  label: string; 
  id: string; 
  error?: string; 
  children: React.ReactNode;
  tooltip?: string;
}) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-1">
      <label htmlFor={id} className="block text-sm font-medium text-secondary-700">
        {label}
      </label>
      {tooltip && (
        <div className="group relative">
          <button 
            type="button" 
            className="flex items-center text-xs text-secondary-500 hover:text-primary-500"
          >
            <LightBulbIcon className="h-4 w-4" />
          </button>
          <div className="absolute right-0 bottom-full mb-2 w-64 p-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-xs text-secondary-700">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    {children}
    {error && (
      <p className="mt-1 text-sm text-error-600 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const EmailForm: React.FC = () => {
  const { loading, setLoading, addEmail, setError: setGlobalError } = useAppStore();
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<EmailFormSchema>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      industry: '',
      role: '',
      offer: '',
      tone: 'Professional',
    },
  });

  const onSubmit = async (data: EmailFormSchema) => {
    try {
      setLoading(true);
      setGlobalError(null);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate email');
      }
      
      const { email } = await response.json();
      
      if (!email) {
        throw new Error('No email was generated');
      }
      
      // Add email to store
      addEmail(data, email);
      
      // Optional: reset form for next email
      // reset();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setGlobalError(errorMessage);
      console.error('Email generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-secondary-100"
    >
      <h2 className="text-2xl font-semibold text-secondary-900 mb-6 flex items-center">
        <span className="h-7 w-1.5 bg-primary-500 rounded-full mr-3"></span>
        Generate Your Cold Email
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <FormField 
              label="Target Industry" 
              id="industry" 
              error={errors.industry?.message}
              tooltip="Be specific about the industry for better personalization"
            >
              <input
                {...field}
                type="text"
                id="industry"
                placeholder="e.g., Tech, Healthcare, Finance, Education"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.industry 
                    ? 'border-error-300 focus:ring-error-500 focus:border-error-500' 
                    : 'border-secondary-200 focus:ring-primary-500 focus:border-primary-500'
                } shadow-sm focus:ring-2 focus:ring-opacity-20 transition-colors`}
                disabled={loading}
              />
            </FormField>
          )}
        />
        
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <FormField 
              label="Recipient's Role" 
              id="role" 
              error={errors.role?.message}
              tooltip="The more specific the role, the more targeted your email will be"
            >
              <input
                {...field}
                type="text"
                id="role"
                placeholder="e.g., HR Manager, CTO, Marketing Director"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.role 
                    ? 'border-error-300 focus:ring-error-500 focus:border-error-500' 
                    : 'border-secondary-200 focus:ring-primary-500 focus:border-primary-500'
                } shadow-sm focus:ring-2 focus:ring-opacity-20 transition-colors`}
                disabled={loading}
              />
            </FormField>
          )}
        />
        
        <Controller
          name="offer"
          control={control}
          render={({ field }) => (
            <FormField 
              label="What You're Offering" 
              id="offer" 
              error={errors.offer?.message}
              tooltip="Focus on value - what problem does your offering solve?"
            >
              <textarea
                {...field}
                id="offer"
                rows={3}
                placeholder="e.g., Freelance web development services, Job application, Partnership proposal"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.offer 
                    ? 'border-error-300 focus:ring-error-500 focus:border-error-500' 
                    : 'border-secondary-200 focus:ring-primary-500 focus:border-primary-500'
                } shadow-sm focus:ring-2 focus:ring-opacity-20 transition-colors`}
                disabled={loading}
              />
            </FormField>
          )}
        />
        
        <Controller
          name="tone"
          control={control}
          render={({ field }) => (
            <FormField 
              label="Email Tone" 
              id="tone" 
              error={errors.tone?.message}
              tooltip="Match the tone to your industry and relationship goals"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {toneOptions.map((option) => (
                  <div 
                    key={option.value}
                    className={`
                      cursor-pointer rounded-md border p-3 flex items-center justify-center text-sm font-medium transition-all
                      ${field.value === option.value 
                        ? 'bg-primary-50 border-primary-500 text-primary-700 ring-2 ring-primary-500 ring-opacity-30' 
                        : 'border-secondary-200 text-secondary-700 hover:border-primary-300 hover:bg-primary-50/30'}
                    `}
                    onClick={() => field.onChange(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </FormField>
          )}
        />
        
        <motion.button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md shadow-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative overflow-hidden group ${
            loading 
              ? 'bg-primary-400 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <span className="relative flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Email...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="h-5 w-5 mr-2 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Generate Email
              </>
            )}
          </span>
          <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-primary-500 to-primary-800 transform -skew-x-12 group-hover:w-full group-hover:skew-x-0 transition-all duration-500 ease-out -z-10"></span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailForm; 