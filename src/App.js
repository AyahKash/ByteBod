import React, {useState} from 'react';
import './App.css';
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import AuthDetails from "./components/auth/AuthDetails"
import ForgotPassword from './components/auth/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { Settings } from "./components/pages/Settings";
import { Profile } from "./components/pages/Profile";
import { FriendsPage } from "./components/pages/FriendsPage";
import { CreateWorkoutLog } from "./components/pages/CreateWorkoutLog";
import { WorkoutLogs } from "./components/pages/WorkoutLogs";
import { SearchResults } from "./components/pages/SearchResults";
import CreatePost from "./components/pages/CreatePost";
import { AboutMe } from "./components/pages/AboutMe";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/homepage" element={<React.Fragment><HomePage postsList={posts}/><AuthDetails /></React.Fragment>} /> */}
        <Route path="/homepage" element={<React.Fragment><HomePage/><AuthDetails /></React.Fragment>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/friends" element={<FriendsPage />}/>
        <Route path="/profile/workoutlogs" element={<WorkoutLogs />}/>
        <Route path="/profile/createworkoutlog" element={<CreateWorkoutLog/>}/>
        <Route path="/createpost" element={<CreatePost updatePosts={setPosts}/>}/>      
        <Route path="/reset" element={<ForgotPassword/>}/>
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/searchresults" element={<SearchResults/>}/>
        </Routes>
    </div>
  );
}

export default App;