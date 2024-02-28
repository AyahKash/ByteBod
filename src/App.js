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
import { CreatePost } from "./components/pages/CreatePost"


  //   {
  //     title: "Post One",
  //     postText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //     id: "1",
  //   }

function App() {
  const [posts, setPosts] = useState([]);
  // setPosts([
  //  {
  //    title: "Post One",
  //   postText:
  //    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //    id: "1",
  //     }
  //    ]);
  //<Route path="/homepage" element={<React.Fragment><HomePage/><AuthDetails /></React.Fragment>} />
//<Route path="/createpost" element={<CreatePost/>}/>

  //        <Route path="/createpost" element={<CreatePost updatePosts={setPosts}/>}/>
  //        <Route path="/homepage" element={<React.Fragment><HomePage postsList={posts}/><AuthDetails /></React.Fragment>} />

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<React.Fragment><HomePage postsList={posts}/><AuthDetails /></React.Fragment>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost updatePosts={setPosts}/>}/>      
        <Route path="/reset" element={<ForgotPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;