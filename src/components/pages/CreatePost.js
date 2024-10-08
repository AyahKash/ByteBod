import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import "./CreatePost.css";
import { useNavigate } from 'react-router-dom';
import running from "../../images/runningblue.png"
import yoga from "../../images/yogablue.png"
import lifting from "../../images/liftingblue.png"

/**
 * Renders the create post form that is generated when the user clicks on "Create a Post"
 * button in the user home page (where all the posts are displayed). 
 * 
 * This generates a form where a user can enter their post content. A post object is created
 * and added to Firestore, including the time that this post was created and the user that created 
 * the post. 
 */

export const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const createDate = new Date();
  const [workoutType, setWorkoutType] = useState("");

  //format current time at post creation
  const formattedTime = createDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Whether to use 12-hour time (true) or 24-hour time (false)
  });

  // remove spaces from string and convery to all lowercase. 
  const formatString = (string) => {
    return string.replace(/\s/g, "").toLowerCase();
  };

  const dateString = formattedTime.toString();
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

    //add post to firebase
    //when post is first created likes should be 0, commentlist empty
    const createPost = async (event) => {
        event.preventDefault();
        const formattedWorkoutType = formatString(workoutType);
        const newPostData = { 
            title, 
            postText, 
            author: {name: auth.currentUser.displayName, id: auth.currentUser.uid, photoUrl: auth.currentUser.photoURL},
            workoutType,
            formattedWorkoutType,
            createAt: dateString,
            likes: 0,
            commentsList: [],
        };
        try {
            await addDoc(postsCollectionRef, newPostData)
        } catch (error) {
            console.log("Error adding post to database: ", error)
        }

        navigate("/homepage");
    }; 
    

  return (
    <form onSubmit={createPost}>
    <div className="createPostPage">
        <div className="cpContainer">
        <h1>Log New Workout</h1>
        <div className="icons">
          <img src={running}/>
          <img src={yoga}/>
          <img src={lifting}/>
        </div>
        <div className="row">
            <div className="col"> 
            <div className="input">
                <label className="label-class"> Title </label>
                <input placeholder="Title..." onChange={(event) => 
                    {setTitle(event.target.value);
                    }}
                    required
                />
            </div>
            <div className="input">
              <label className="label-class">Type of Workout</label>
              <select value={workoutType} onChange={(event) => setWorkoutType(event.target.value)} required>
                <option value="Barre">Barre</option>
                <option value="Bodyweight training">Bodyweight training</option>
                <option value="Boxing">Boxing</option>
                <option value="Cardio">Cardio</option>
                <option value="Cycling">Cycling</option>
                <option value="Dancing">Dancing</option>
                <option value="HIIT">HIIT</option>
                <option value="Kayaking">Kayaking</option>
                <option value="Meditation">Meditation</option>
                <option value="Pilates">Pilates</option>
                <option value="Powerbuilding">Powerbuilding</option>
                <option value="Rock climbing">Rock climbing</option>
                <option value="Rowing">Rowing</option>
                <option value="Running">Running</option>
                <option value="Spinning">Spinning</option>
                <option value="Strength Training">Strength training</option>
                <option value="Swimming">Swimming</option>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Yoga">Yoga</option>
                <option value="Zumba">Zumba</option>
                <option value="Other">Other</option>
                </select></div>
              </div>
              <div className="col">
              <div className="input" id="description">
                <label className="label-class"> Description </label>
                <textarea placeholder="Describe your workout..." onChange={(event) => 
                    {setPostText(event.target.value);
                    }}
                    required
                />
            </div>
            </div>
            </div>
            <button type="submit">Submit Post</button>
        <div className="cancel-actions">   
        <button class="cancel" onClick={() => navigate("/HomePage")}>Cancel</button>
        </div>
        </div>
        
    </div>
    </form>
  )
}

export default CreatePost;