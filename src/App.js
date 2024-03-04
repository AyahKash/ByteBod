import React, {useState} from 'react';
import './App.css';
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import AuthDetails from "./components/auth/AuthDetails"
import ForgotPassword from './components/auth/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { Settings } from "./components/pages/Settings";
<<<<<<< HEAD
import Profile from "./components/pages/Profile";
=======
import { Profile } from "./components/pages/Profile";
import { FriendsPage } from "./components/pages/FriendsPage";
>>>>>>> 731407376dc52f1f4a3cd1809f1b3add947f31f9
import CreatePost from "./components/pages/CreatePost";

function App() {
  const [posts, setPosts] = useState([]);

  //<Route path="/homepage" element={<React.Fragment><HomePage/><AuthDetails /></React.Fragment>} />
//<Route path="/createpost" element={<CreatePost/>}/>

  //        <Route path="/createpost" element={<CreatePost updatePosts={setPosts}/>}/>
  //        <Route path="/homepage" element={<React.Fragment><HomePage postsList={posts}/><AuthDetails /></React.Fragment>} />

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
        <Route path="/createpost" element={<CreatePost updatePosts={setPosts}/>}/>      
        <Route path="/reset" element={<ForgotPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;