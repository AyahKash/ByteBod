import './App.css';
<<<<<<< HEAD
import Homepage from "./components/Homepage.js"
=======
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

>>>>>>> db13f3d211f989a243aad018fb0abfb6f5e520af

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Homepage></Homepage>
=======
      <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      </Routes>
>>>>>>> db13f3d211f989a243aad018fb0abfb6f5e520af
    </div>
  );
}

export default App;
