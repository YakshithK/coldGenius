"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [industry, setIndustry] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [offer, setOffer] = useState<string>('');
  const [tone, setTone] = useState<'Casual' | 'Formal' | 'Bold'>('Casual');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', {
        industry,
        role,
        offer,
        tone,
      });
      setEmail(res.data.email);
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">ColdGenius 🚀</h1>

      <div className="flex flex-col w-full max-w-md space-y-4">
        <input 
          type="text" 
          placeholder="Target Industry" 
          value={industry} 
          onChange={(e) => setIndustry(e.target.value)}
          className="p-2 rounded border"
        />
        <input 
          type="text" 
          placeholder="Target Role" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded border"
        />
        <input 
          type="text" 
          placeholder="Your Offer" 
          value={offer} 
          onChange={(e) => setOffer(e.target.value)}
          className="p-2 rounded border"
        />
        <select 
          value={tone} 
          onChange={(e) => setTone(e.target.value as 'Casual' | 'Formal' | 'Bold')}
          className="p-2 rounded border"
        >
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Bold">Bold</option>
        </select>

        <button
          onClick={generateEmail}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Email'}
        </button>

        {email && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Generated Email:</h2>
            <p>{email}</p>
            <button
              onClick={() => navigator.clipboard.writeText(email)}
              className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Copy Email
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
