'use client';

import { useState } from 'react';

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    industry: '',
    role: '',
    offer: '',
    tone: 'friendly'
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.offer.trim()) {
      newErrors.offer = 'Offer is required';
    } else if (formData.offer.trim().length < 5) {
      newErrors.offer = 'Offer must be at least 5 characters';
    }
    
    if (!formData.tone) {
      newErrors.tone = 'Tone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Fill in the details</h2>
      
      <div className="form-group">
        <label htmlFor="industry" className="form-label">Industry</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g., Tech, Healthcare"
          className={`form-input ${errors.industry ? 'border-red-500' : 'border-slate-300'} focus:border-primary transition-colors`}
        />
        {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="role" className="form-label">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g., CTO, Marketing Manager"
          className={`form-input ${errors.role ? 'border-red-500' : 'border-slate-300'} focus:border-primary transition-colors`}
        />
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="offer" className="form-label">Your Offer</label>
        <textarea
          id="offer"
          name="offer"
          value={formData.offer}
          onChange={handleChange}
          placeholder="What you're offering, e.g., a free consultation"
          className={`form-input min-h-[120px] ${errors.offer ? 'border-red-500' : 'border-slate-300'} focus:border-primary transition-colors`}
        />
        {errors.offer && <p className="text-red-500 text-sm mt-1">{errors.offer}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="tone" className="form-label">Tone</label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className={`form-input ${errors.tone ? 'border-red-500' : 'border-slate-300'} focus:border-primary transition-colors`}
        >
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="confident">Confident</option>
          <option value="casual">Casual</option>
        </select>
        {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone}</p>}
      </div>
      
      <div className="flex justify-center mt-6">
        <button type="submit" className="btn btn-primary w-full max-w-xs py-3 text-lg font-medium">
          Generate Email
        </button>
      </div>
    </form>
  );
}
