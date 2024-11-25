import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from './components/Header';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Shops from './pages/Shops';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Analytics />
        <SpeedInsights />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;