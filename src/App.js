import './App.css';
import Homepage from './components/auth/Homepage';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';
import { BrowserRouter as Router, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Homepage/>
      <SignUp />
      <AuthDetails />
    </div>
    </Router>
  );
}

export default App;
