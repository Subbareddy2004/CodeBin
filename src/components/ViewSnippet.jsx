import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import the light theme for syntax highlighting
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Light theme for code blocks
import { FaCopy, FaHome } from 'react-icons/fa';

// This component displays a single code snippet and has been updated for the light theme.
// Key changes include:
// - Text colors updated for readability on light backgrounds (e.g., text-slate-700 for titles, text-blue-600 for links).
// - Loading spinner and error message colors adjusted to fit the light theme.
// - Syntax Highlighting: Switched from 'vscDarkPlus' to 'prism' theme.
function ViewSnippet() {
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/snippets/${id}`, {
          withCredentials: true
        });
        setSnippet(response.data);
      } catch (error) {
        console.error('Error fetching snippet:', error);
        if (error.response && error.response.status === 404) {
          setError('Snippet not found. It may have been removed or never existed.');
        } else {
          setError('An error occurred while fetching the snippet. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Loading State: Displays a centered CSS spinner.
  // - Spinner border color changed from 'border-cyan-500' to 'border-blue-500' for light theme.
  if (isLoading) return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Error State: Displays a centered error message and a link to home.
  // - Text color for error message changed from 'text-red-500' to 'text-red-700'.
  // - Link color changed from 'text-blue-500' to 'text-blue-600' (primary accent).
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-700 mb-4 text-lg">{error}</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm transition duration-300 text-lg">
          <FaHome className="mr-2" />
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Snippet Title: Text color 'text-slate-700' for readability on light background. */}
      <h2 className="text-3xl font-semibold text-slate-700 mb-6">{snippet.title}</h2>
      
      {/* Code Display Area:
          - Container div now has 'border-slate-300' for definition on light background.
          - Copy Code button styled as a primary action button ('bg-blue-600'). */}
      <div className="relative rounded-lg overflow-hidden shadow-md border border-slate-300">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
        >
          <FaCopy className="mr-2" />
          {copySuccess ? 'Copied!' : 'Copy Code'}
        </button>
        
        {/* SyntaxHighlighter theme switched to 'prism' (light theme).
            - Background color explicitly set to '#f8f9fa' to complement the 'prism' style
              and ensure consistency. This replaces the dark background (e.g., '#1e1e1e') used previously. */}
        <SyntaxHighlighter 
          language={snippet.language} 
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
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      
      {/* "Back to Create Snippet" link styled with primary accent color 'text-blue-600'. */}
      <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm transition duration-300">
        <FaHome className="mr-2" />
        Back to Create Snippet
      </Link>
    </div>
  );
}

export default ViewSnippet;
