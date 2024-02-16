import React from 'react';
import './App.css';
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import AuthDetails from "./components/auth/AuthDetails"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<React.Fragment><SignIn /><AuthDetails /></React.Fragment>} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>

    
  );
}

export default App;

