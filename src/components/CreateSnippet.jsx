import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import the light theme for syntax highlighting
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Light theme for code blocks
import { FaChevronDown, FaChevronUp, FaCopy, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

// This component has been updated to the new light theme.
// Key changes include:
// - Backgrounds: Dark backgrounds (e.g., bg-gray-800) replaced with light ones (e.g., bg-white, bg-slate-100).
// - Text: Dark theme text colors (e.g., text-white, text-cyan-300) replaced with darker text for light backgrounds (e.g., text-slate-800, text-blue-600).
// - Borders: Added/updated borders (e.g., border-slate-300) for elements on light backgrounds to maintain definition.
// - Syntax Highlighting: Switched from 'vscDarkPlus' to 'prism' for a light-compatible theme.
function CreateSnippet() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [linkCopySuccess, setLinkCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      setError('Please fill in both title and code fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/snippets`, {
        title,
        code,
        language
      }, {
        withCredentials: true
      });
      // Use the full URL of your frontend application
      setGeneratedLink(`${window.location.origin}/snippet/${response.data.id}`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error details:', error.response || error);
      setError(error.response?.data?.error || 'An error occurred while creating the snippet.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopySuccess(true);
    setTimeout(() => setLinkCopySuccess(false), 2000);
  };

  return (
    // Main container for the snippet creation form and its related sections.
    // Uses space-y-8 for consistent vertical spacing between major child elements (title, form, messages, preview).
    // animate-fade-in-up provides a subtle entry animation.
    <div className="space-y-8 animate-fade-in-up">
      {/* Page title using primary accent color (text-blue-600) for light theme. */}
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create a New Snippet</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields updated for light theme:
            - bg-white, text-slate-800 (default body text), border-slate-300.
            - Focus state uses blue-500 accent. Placeholder text color set for contrast. */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 transition duration-300 mb-4 placeholder-slate-500"
        />
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4">
          {/* Select element styled similarly to input fields for consistency. */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 transition duration-300 mb-4 md:mb-0"
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
          </select>
          
          {/* Submit Button updated for light theme:
              - Primary action color 'bg-blue-600' with 'text-white'.
              - Focus ring adjusted to 'focus:ring-blue-500'. */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 font-semibold flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              'Generate Link'
            )}
          </button>
        </div>
        
        {/* Textarea styled consistently with other input fields for the light theme. */}
        <textarea
          placeholder="Paste your code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          rows="12"
          className="w-full px-4 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 font-mono transition duration-300 resize-none placeholder-slate-500"
        />
      </form>
      
      {/* Error Message Display adapted for light theme:
          - Background 'bg-red-100', text 'text-red-700', border 'border-red-400'.
          - Icon color 'text-red-500' for appropriate emphasis. */}
      {error && (
        <div className="p-5 rounded-lg bg-red-100 border border-red-400 text-red-700 animate-fade-in flex items-center">
          <FaExclamationCircle className="mr-3 text-xl text-red-500" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Generated Link Display adapted for light theme:
          - Background 'bg-green-100', text 'text-green-700', border 'border-green-400'.
          - Link text uses primary accent 'text-blue-600'.
          - "Copy Link" button styled like other primary buttons. */}
      {generatedLink && (
        <div className="p-5 rounded-lg bg-green-100 border border-green-400 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
            <p className="text-green-700 mb-2 sm:mb-0">Share this link:</p>
            <button
              onClick={copyLinkToClipboard}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center self-start sm:self-center"
            >
              <FaCopy className="mr-2" />
              {linkCopySuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <a
            href={generatedLink}
            className="block text-blue-600 hover:text-blue-700 hover:bg-slate-100 p-2 rounded-md break-all transition duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {generatedLink}
          </a>
        </div>
      )}
      
      {/* Code Preview Section for light theme:
          - Title text color updated to 'text-slate-700'.
          - Container div now has 'border-slate-300' for better definition on light backgrounds. */}
      {code && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-3 text-slate-700">Preview</h3>
          <div className="relative rounded-lg overflow-hidden shadow-md border border-slate-300">
            {/* Copy Code button styled as a primary action button. */}
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              {copySuccess ? 'Copied!' : 'Copy Code'}
            </button>
            {/* SyntaxHighlighter theme switched to 'prism' (light theme).
                - Background color explicitly set to '#f8f9fa' to match typical light code themes
                  and ensure consistency if the 'prism' style itself doesn't force a background. */}
            <SyntaxHighlighter 
              language={language} 
              style={prism} // Changed from vscDarkPlus (dark theme)
              customStyle={{ 
                padding: '1.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                backgroundColor: '#f8f9fa', // Light background for code block
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateSnippet;
