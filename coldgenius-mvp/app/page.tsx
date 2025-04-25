'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import EmailForm from '@/components/EmailForm';
import EmailResult from '@/components/EmailResult';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { currentEmail } = useAppStore();
  const hasEmail = !!currentEmail;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
            Write Professional Cold Emails in Seconds
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Generate personalized, compelling emails with AI - no writing experience required.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {hasEmail ? (
            // Side-by-side layout when email is generated
            <motion.div 
              key="side-by-side"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2"
            >
              <EmailForm />
              <EmailResult />
            </motion.div>
          ) : (
            // Centered layout when no email is generated
            <motion.div 
              key="centered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto"
            >
              <EmailForm />
            </motion.div>
          )}
        </AnimatePresence>
        

      </main>
    </div>
  );
} 