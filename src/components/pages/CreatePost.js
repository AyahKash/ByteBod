import React, { useState } from 'react';
import { addDoc, getDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import "./CreatePost.css";
import { useNavigate } from 'react-router-dom';

export const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const createDate = new Date();

  const formattedTime = createDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Whether to use 12-hour time (true) or 24-hour time (false)
  });

  const dateString = formattedTime.toString();
  
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

    //first add post to firebase
    const createPost = async (event) => {
        event.preventDefault();
        const newPostData = { 
            title, 
            postText, 
            author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
            createAt: dateString,
        };
        try {
            await addDoc(postsCollectionRef, newPostData)
        } catch (error) {
            console.log("Error adding post to database: ", error)
        }
        
        //the functionality for fetching data from firebase will be in HomePage.js
        // props.updatePosts( (prevList) => {
        // //NEED to capture new post that was added to firebase
        // return [...prevList, newPostData];
        // })

        navigate("/homepage");
    }; 
    

  return (
    <form onSubmit={createPost}>
    <div className="createPostPage">
        <div className="cpContainer">
        <h1>Log New Workout</h1>
            <div className="input">
                <label className="label-class"> Title </label>
                <input placeholder="Title..." onChange={(event) => 
                    {setTitle(event.target.value);
                    }}
                />
            </div>
            <div className="input">
                <label className="label-class"> Description </label>
                <textarea placeholder="Describe your workout..." onChange={(event) => 
                    {setPostText(event.target.value);
                    }}
                />
            </div>
            <button type="submit">Submit Post</button>
        </div>
    </div>
    </form>
  )
}

export default CreatePost;