/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import ArticleDetail from './pages/ArticleDetail';
import Whitepaper from './pages/Whitepaper';
import RequestAccess from './pages/RequestAccess';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-black relative">
        {/* Background Decor */}
        <div className="fixed inset-0 bg-grid -z-10" />
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950 -z-10" />
        
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/request-access" element={<RequestAccess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

