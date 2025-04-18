import { useState } from 'react';
import { motion } from "framer-motion";
import './css/App.css';
import Home from './Home.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './content.jsx';
import NotFound from './404.jsx';



function App() {
  return (
    <>

    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Content />} /> 
      <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
    </>
  );

}

export default App;
