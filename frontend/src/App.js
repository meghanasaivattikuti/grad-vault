import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Upload from './components/Upload';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;