import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaChevronDown, FaChevronUp, FaCopy, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

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
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">Create a New Snippet</h2>
      
      {/* Form element with space-y-4 for spacing between internal form groups/elements. */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input: Full width with bottom margin. */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-gray-700 transition duration-300 text-white mb-4"
        />
        
        {/* Container for Language Select and Generate Button.
            Layout responsiveness:
            - Small screens (default): Elements stack vertically (flex-col).
            - Medium screens (md) and up: Elements are in a row (md:flex-row),
              language select on the left, button on the right (md:justify-between),
              and vertically centered (md:items-center).
            - md:space-x-4 provides horizontal spacing between select and button on medium+ screens. */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            // Responsive width: full on small screens, 1/3 on medium+ screens.
            // Margin bottom for small screens (mb-4), removed on medium+ (md:mb-0) as space-x handles horizontal spacing.
            className="w-full md:w-1/3 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-gray-700 transition duration-300 text-white mb-4 md:mb-0"
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
          </select>
          
          {/* Submit Button: Full width on small screens, auto width on medium+.
              Includes loading state with FaSpinner icon.
              `flex items-center justify-center` ensures spinner and text are aligned. */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-semibold flex items-center justify-center"
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
        
        {/* Code Textarea: Full width, specific row count, and styled for code input. */}
        <textarea
          placeholder="Paste your code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          rows="12"
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-gray-700 font-mono transition duration-300 text-white resize-none"
        />
      </form>
      
      {/* Error Message Display:
          - Shown only when 'error' state is not empty.
          - Enhanced styling: p-5 padding, increased bg-opacity-75 for emphasis,
            border for definition, and an exclamation icon for visual cue.
          - `flex items-center` aligns icon and text. */}
      {error && (
        <div className="p-5 rounded-lg bg-red-900 bg-opacity-75 border border-red-500 text-red-200 animate-fade-in flex items-center">
          <FaExclamationCircle className="mr-3 text-xl text-red-300" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Generated Link Display:
          - Shown only when 'generatedLink' state is not empty.
          - Enhanced styling: p-5 padding, increased bg-opacity-75.
          - Internal layout for "Share this link" text and "Copy Link" button:
            - Stacks vertically on small screens (flex-col).
            - Arranges in a row on 'sm' screens and up (sm:flex-row), with text on left and button on right.
            - `self-start sm:self-center` on button for responsive alignment.
          - Link itself styled with hover background for better interactivity. */}
      {generatedLink && (
        <div className="p-5 rounded-lg bg-green-900 bg-opacity-75 border border-green-500 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
            <p className="text-green-200 mb-2 sm:mb-0">Share this link:</p>
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
            className="block text-cyan-300 hover:text-cyan-200 hover:bg-gray-700/50 p-2 rounded-md break-all transition duration-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            {generatedLink}
          </a>
        </div>
      )}
      
      {/* Code Preview Section:
          - Shown only when 'code' state is not empty.
          - `h3` title for the preview section.
          - `SyntaxHighlighter` component for rendering code with specific styling.
            - `customStyle` provides padding, font size, line height, and background color,
              chosen for readability and aesthetic consistency.
            - `vscDarkPlus` is a popular dark theme for syntax highlighting. */}
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
              customStyle={{ // Custom styles for the code preview area
                padding: '1.5rem', // Ample padding around the code
                fontSize: '0.9rem', // Slightly smaller font size for code blocks
                lineHeight: '1.5',  // Standard line height for readability
                fontFamily: "'Fira Code', 'Consolas', monospace", // Preferred monospaced fonts
                backgroundColor: '#1e1e1e', // Dark background for the code block
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
