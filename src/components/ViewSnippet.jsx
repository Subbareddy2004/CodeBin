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

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline flex items-center justify-center">
          <FaHome className="mr-2" />
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">{snippet.title}</h2>
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
        >
          <FaCopy className="mr-2" />
          {copySuccess ? 'Copied!' : 'Copy Code'}
        </button>
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
      <Link to="/" className="text-blue-500 hover:underline flex items-center">
        <FaHome className="mr-2" />
        Back to Create Snippet
      </Link>
    </div>
  );
}

export default ViewSnippet;
