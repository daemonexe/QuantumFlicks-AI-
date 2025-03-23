import { useState } from 'react';
import { motion } from "framer-motion";
import './css/App.css';
import Home from './Home.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './content.jsx';
import SumPage from './SummaryPage.jsx';
import Quiz from './Quiz.jsx';
import NotFound from './404.jsx';


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Content />} /> 
      <Route path="/wiki" element={<SumPage />} /> 
      <Route path="/quiz" element={<Quiz />} /> 
      <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
    </>
  );

}

export default App;
