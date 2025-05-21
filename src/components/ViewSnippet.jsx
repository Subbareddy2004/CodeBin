import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaHome } from 'react-icons/fa';

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
  // - `flex justify-center items-center py-10`: Centers the spinner and provides vertical padding.
  // - The spinner itself is a div with Tailwind classes for animation, shape, and border color.
  if (isLoading) return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  // Error State: Displays a centered error message and a link to home.
  // - `py-10`: Provides vertical padding.
  // - `text-lg`: Increases font size for better readability of the error and link.
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4 text-lg">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm transition duration-300 text-lg">
          <FaHome className="mr-2" />
          Go back to home
        </Link>
      </div>
    );
  }

  // Main content display for a fetched snippet.
  // Uses space-y-8 for consistent vertical spacing between title, code block, and back link.
  return (
    <div className="space-y-8">
      {/* Snippet Title: Increased bottom margin (mb-6) for better separation. */}
      <h2 className="text-3xl font-bold mb-6">{snippet.title}</h2>
      
      {/* Code Display Area: Relative positioning for the absolute positioned copy button. */}
      <div className="relative">
        {/* Copy Code Button: Positioned at the top-right of the code block. */}
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
        >
          <FaCopy className="mr-2" />
          {copySuccess ? 'Copied!' : 'Copy Code'}
        </button>
        
        {/* SyntaxHighlighter for displaying code with appropriate styling.
            - `vscDarkPlus` provides the color theme.
            - `customStyle` ensures consistent padding, font size, line height, and background
              with the CreateSnippet preview. */}
        <SyntaxHighlighter 
          language={snippet.language} 
          style={vscDarkPlus}
          customStyle={{
            padding: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            fontFamily: "'Fira Code', 'Consolas', monospace",
            backgroundColor: '#1e1e1e',
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      
      {/* Link to navigate back to the snippet creation page. */}
      <Link to="/" className="text-blue-500 hover:underline flex items-center focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm transition duration-300">
        <FaHome className="mr-2" />
        Back to Create Snippet
      </Link>
    </div>
  );
}

export default ViewSnippet;
