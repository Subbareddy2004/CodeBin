import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaChevronDown, FaChevronUp, FaCopy } from 'react-icons/fa';

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/snippets`, { title, code, language });
      setGeneratedLink(`${window.location.origin}/snippet/${response.data.id}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        setError(`Validation error: ${errorMessages}`);
      } else if (error.response) {
        setError(`Error: ${error.response.data.error || 'Unknown error occurred'}`);
      } else if (error.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('Error creating snippet. Please try again.');
      }
      console.error('Error creating snippet:', error);
    } finally {
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
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">Create a New Snippet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-grow px-4 mb-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 text-white"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 mb-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 text-white"
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 mb-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-semibold"
          >
            {isLoading ? 'Generating...' : 'Generate Link'}
          </button>
        </div>
        <textarea
          placeholder="Paste your code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          rows="12"
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono transition duration-300 text-white resize-none"
        />
      </form>
      {error && (
        <div className="p-4 rounded-lg bg-red-900 bg-opacity-50 border border-red-500 text-red-300 animate-fade-in">
          {error}
        </div>
      )}
      {generatedLink && (
        <div className="p-4 rounded-lg bg-green-900 bg-opacity-50 border border-green-500 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <p className="text-green-300">Share this link:</p>
            <button
              onClick={copyLinkToClipboard}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
            >
              <FaCopy className="mr-2" />
              {linkCopySuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <a
            href={generatedLink}
            className="text-cyan-400 hover:text-cyan-300 break-all transition duration-300"
          >
            {generatedLink}
          </a>
        </div>
      )}
      {code && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-3 text-cyan-300">Preview</h3>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              {copySuccess ? 'Copied!' : 'Copy Code'}
            </button>
            <SyntaxHighlighter 
              language={language} 
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
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateSnippet;