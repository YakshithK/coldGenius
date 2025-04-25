'use client';

export default function EmailOutput({ subject, emailContent }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cold Email</h2>
      
      {subject && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Subject Line:
          </h3>
          <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 font-medium">
            {subject}
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Email Body:
        </h3>
        <div className="email-container bg-white p-5 rounded-lg border border-slate-200 whitespace-pre-line">
          {emailContent}
        </div>
      </div>
    </div>
  );
}
