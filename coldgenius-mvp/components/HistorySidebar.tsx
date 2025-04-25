'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose }) => {
  const { emails, setCurrentEmail, deleteEmail, clearHistory } = useAppStore();

  const sidebarVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { y: 10, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  // Format the date for display
  const formatEmailDate = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy h:mm a');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-secondary-900/50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-secondary-100">
              <h2 className="text-lg font-semibold text-secondary-900">Email History</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {emails.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center flex-grow p-4 text-secondary-500"
              >
                <p className="text-center mt-4">No emails generated yet</p>
              </motion.div>
            ) : (
              <div className="flex-grow overflow-auto">
                <div className="p-4">
                  <button
                    onClick={clearHistory}
                    className="text-sm flex items-center text-secondary-600 hover:text-error-600"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Clear History
                  </button>
                </div>
                <ul className="divide-y divide-secondary-100">
                  {emails.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="p-4 hover:bg-secondary-50 cursor-pointer"
                      onClick={() => {
                        setCurrentEmail(item.email);
                        onClose();
                      }}
                    >
                      <div className="mb-1 flex justify-between">
                        <span className="font-medium text-secondary-900">
                          {item.industry} - {item.role}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEmail(item.id);
                          }}
                          className="text-secondary-400 hover:text-error-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-secondary-500 truncate">{item.offer}</p>
                      <p className="text-xs text-secondary-400 mt-1">
                        {formatEmailDate(item.createdAt)}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar; 