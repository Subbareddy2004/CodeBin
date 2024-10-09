import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ViewSnippet() {
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/snippets/${id}`);
        setSnippet(response.data);
      } catch (error) {
        console.error('Error fetching snippet:', error);
        if (error.response && error.response.status === 404) {
          setError('Snippet not found. It may have been removed or never existed.');
        } else {
          setError('An error occurred while fetching the snippet. Please try again later.');
        }
      }
    };
    fetchSnippet();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!snippet) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">{snippet.title}</h2>
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          {copySuccess ? 'Copied!' : 'Copy Code'}
        </button>
        <SyntaxHighlighter language={snippet.language} style={vscDarkPlus} className="rounded-md">
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default ViewSnippet;