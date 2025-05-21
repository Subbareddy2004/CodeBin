import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateSnippet from './components/CreateSnippet';
import ViewSnippet from './components/ViewSnippet';
import { FaGithub } from 'react-icons/fa';

function App() {
  return (
    <Router>
      {/* Main application wrapper.
          - Previous dark gradient background (from-gray-900 via-blue-900 to-purple-900) removed.
          - Now relies on global 'bg-slate-50' from body (src/index.css) for the base light theme background.
          - Default text color set to 'text-slate-800' for high contrast on the light background. */}
      <div className="min-h-screen text-slate-800 relative">
        {/* Navigation bar adapted for light theme:
            - Background changed from semi-transparent dark ('bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl')
              to opaque white ('bg-white') with a subtle shadow ('shadow-md') for depth. */}
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Brand link color updated from 'text-cyan-400' to 'text-blue-600' for light theme primary accent. */}
            <Link to="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">CodeBin</Link>
            {/* GitHub link color updated from 'text-white hover:text-cyan-400' to 'text-slate-700 hover:text-blue-600'. */}
            <a href="https://github.com/Subbareddy2004/CodeBin" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-blue-600 transition-colors">
              <FaGithub size={24} />
            </a>
          </div>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto px-4 py-10 max-w-5xl relative z-10">
            {/* Inner content box styling updated for light theme:
                - Background changed from semi-transparent dark ('bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl')
                  to opaque white ('bg-white').
                - Border color changed from 'border-gray-700' to 'border-slate-300' for a softer definition on light background.
                - Shadow 'shadow-xl' maintained for depth, works well on light theme. */}
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-300">
              <Routes>
                <Route path="/" element={<CreateSnippet />} />
                <Route path="/snippet/:id" element={<ViewSnippet />} />
              </Routes>
            </div>
            {/* Footer text color updated from 'text-blue-200' (light text on dark bg) to 'text-slate-500' (muted dark text on light bg). */}
            <footer className="mt-12 text-center text-slate-500 text-sm">
              Made with ❤️ by Subbareddy
            </footer>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
