import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateSnippet from './components/CreateSnippet';
import ViewSnippet from './components/ViewSnippet';
import { FaGithub } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative">
        <nav className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-cyan-400">CodeBin</Link>
            <a href="https://github.com/yourusername/codebin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
              <FaGithub size={24} />
            </a>
          </div>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
            <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
              <Routes>
                <Route path="/" element={<CreateSnippet />} />
                <Route path="/snippet/:id" element={<ViewSnippet />} />
              </Routes>
            </div>
            <footer className="mt-10 text-center text-blue-200 text-sm">
              Made with ❤️ by Subbareddy
            </footer>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
