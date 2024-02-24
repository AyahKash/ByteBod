import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import "./CreatePost.css";
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, { 
        title, 
        postText, 
        author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}, 
    })
    navigate("/homepage");
};

  return (
    <div className="createPostPage">
        <div className="cpContainer">
            <h1>Log New Workout</h1>
            <div className="input">
                <label> Title: </label>
                <input placeholder="Title..." onChange={(event) => 
                    {setTitle(event.target.value);
                    }}
                />
            </div>
            <div className="input">
                <label> Description </label>
                <textarea placeholder="Describe your workout..." onChange={(event) => 
                    {setPostText(event.target.value);
                    }}
                />
            </div>
            <button onClick={createPost}>Submit Post</button>
        </div>
    </div>
  )
}