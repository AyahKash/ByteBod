import Button from "./Button";
import Comment from "./Comment";
import "./Card.css";
import React, { useState } from 'react';
import { getDoc, getDocs, collection, updateDoc, doc} from "firebase/firestore";
import { db, auth } from '../firebase';
import profilePhoto from "../images/ProfilePhoto.png";

// assuming post data of form:
const emptyPost = {
  title: "Post Title",
  postAuthor: "Post Author",
  postText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  postDate: "Post Date",
  photoUrl: profilePhoto,
  workoutType: "Workout Type",
  likes: 0,
  commentsList: [],
};


function Card({ post = emptyPost, incrementLikes }) {
  console.log("Here is the actual post object", post);

  if (post.commentsList){
  console.log("Here is length of comments list", post.commentsList.length);
  console.log("Here is the first object in the comments list", post.commentsList[0]);
  }

  const [likes, setLikes] = useState(0);
  const [updatedLikes, setUpdatedLikes] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [clickedToComment, setClickedToComment] = useState(false);
  const [updatedComments, setUpdatedComments] = useState(false);
  
  const postDocRef = doc(db, "posts", post.id); //working with current post, make this to update the post with likes and comments when they are added fresh

  console.log("outputting comments state outside", comments);
  //when user clicks comment button, a text box should generate for them to write a comment
  const updateComments = async (e) => {
    e.preventDefault();
    console.log("Comment button clicked");
    //first get current comments on post
    const docSnap = await getDoc(postDocRef);
    const prevComments = docSnap.data().commentsList;
    console.log("outputting prevComments", prevComments);
    //create new comment
    //setup date
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

    const newComment = {
      text: newCommentText,
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid, photoUrl: auth.currentUser.photoURL},
      date: dateString,
    }
    const update = await updateDoc(postDocRef, {commentsList: [...prevComments, newComment]});
    setComments([...prevComments, newComment]);
    console.log("outputting comments state", comments);
    setUpdatedComments(true);
    setClickedToComment(false);
  }
  
  const updateLikes = async () => {
    setUpdatedLikes(true);
    console.log("you pressed the like button");
    //first get current number of likes
    const docSnap = await getDoc(postDocRef);
    const prevLikes = docSnap.data().likes;
    console.log("Here are prevLikes:", prevLikes);
    //update the likes to firebase
    const update = await updateDoc(postDocRef, {likes: prevLikes + 1});
    setLikes(prevLikes + 1);
  };


  console.log(post.author)
  return (
    <>
    <div className="card">
      <div className="heading">
        <img className="img"
          src={post.author.photoUrl || profilePhoto} 
          alt="Profile"
          width="50"
          style={{ marginRight: "0.75em" }}
        />
        <div>
          <div className="title">{post.title}</div>
          <div className="author">{post.author.name ? post.author.name : "Author Name"}</div>
        </div>
      </div>
      
      {/* <div className="workoutType"> 
      Workout Type: <span>{post.workoutType}</span>
      </div> */}
      {/* <div className="workoutType">
        <span class="tag">Workout Type:</span> <span>{post.workoutType}</span>
        </div> */}
        {post.workoutType && (
        <div className="workoutType">
        <span class="tag">{post.workoutType}</span>
        </div>)}
      <div className="content">{post.postText}</div>
      {typeof(post.createAt) === 'string' && <div className="date">Post Date: {post.createAt}</div>}
      <div className="interaction">
        <Button onClick={updateLikes} className="buttonLike">&#128077; {updatedLikes ? likes : post.likes}</Button>
        <Button onClick={() => {setClickedToComment(!clickedToComment)}} className="buttonComment">&#128172;</Button>
      </div>
    {
    clickedToComment && 
    <>
    <form onSubmit={updateComments}>
    <p>Enter Comment Below</p>
    <textarea style={{color: "black", width: "100%"}} placeholder="Type your comment here..."onChange={(event)=>{setNewCommentText(event.target.value)}}></textarea>
    <button type="submit">Enter</button>
    </form>
    </>
    }
    </div>
    {post.commentsList && post.commentsList.length != 0 && 
    <>
    <div className="comments">
    <h5>Comments</h5>
    {
      !updatedComments ? post.commentsList.map((commentObject)=>(
        <Comment commentObj={commentObject}></Comment>
      ))
      : 
      comments.map((commentObject)=>(
        <Comment commentObj={commentObject}></Comment>
      ))
    } 
    </div>
    </>}
    </>
  );
}

export default Card;
