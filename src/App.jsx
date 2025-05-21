import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateSnippet from './components/CreateSnippet';
import ViewSnippet from './components/ViewSnippet';
import { FaGithub } from 'react-icons/fa';

function App() {
  return (
    <Router>
      {/* Main application wrapper with a gradient background and relative positioning for potential future absolute elements. */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative">
        {/* Navigation bar with a semi-transparent background and blur effect for a modern look. */}
        <nav className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl p-4">
          {/* Container to manage nav content width and alignment. */}
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-cyan-400">CodeBin</Link>
            <a href="https://github.com/Subbareddy2004/CodeBin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
              <FaGithub size={24} />
            </a>
          </div>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Main content container with controlled width, centered, and vertical/horizontal padding. */}
          {/* Increased vertical padding (py-10) for more breathing room. */}
          <div className="container mx-auto px-4 py-10 max-w-5xl relative z-10">
            {/* Inner content box with semi-transparent background, blur effect, rounded corners, shadow, and border. */}
            {/* Increased padding (p-10) for more internal whitespace. */}
            <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-gray-700">
              <Routes>
                <Route path="/" element={<CreateSnippet />} />
                <Route path="/snippet/:id" element={<ViewSnippet />} />
              </Routes>
            </div>
            {/* Footer section with increased top margin (mt-12) for better separation. */}
            <footer className="mt-12 text-center text-blue-200 text-sm">
              Made with ❤️ by Subbareddy
            </footer>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
