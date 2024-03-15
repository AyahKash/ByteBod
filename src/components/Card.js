import Button from "./Button";
import Comment from "./Comment";
import "./Card.css";
import React, { useState } from 'react';
import { getDoc, getDocs, collection, updateDoc, doc} from "firebase/firestore";
import { db, auth } from '../firebase';
import profilePhoto from "../images/ProfilePhoto.png";
import { useNavigate } from 'react-router-dom';

//This emptyPost will be used as a default in cause the post is not properly passed to the Card component below.
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

  /**
   * The Card component renders the post object for a user post. A post comes with the following attributes as shown in the emptyPost:
   * title, postAuthor, postText (content), postDate (generated with newDate()), photoURL (for user profile photo), 
   * workoutType (mandatory for each post), like count, and commentList
   * Each post with these attributes is saved in backend Firestore
   * 
   * @param post the post object itself which is passed from a list of post objects in HomePage.js inside the pages folder.
   * The comment objects are initially generated in CreatePost.js from user input.
   * @return Renders a post JSX component (along with comments if there are comments on this post) that will later be rendered in HomePage.js in pages folder
   */
  
function Card({ post = emptyPost}) {

  if (post.commentsList){
  }

  const [likes, setLikes] = useState(0);
  const [updatedLikes, setUpdatedLikes] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [clickedToComment, setClickedToComment] = useState(false);
  const [updatedComments, setUpdatedComments] = useState(false);
 
  const navigate = useNavigate();

  const cancelAction = (event) => {
        event.preventDefault(); // Prevent form submission
        // closes the comment box
        setClickedToComment(!clickedToComment);
  
    };

  const postDocRef = doc(db, "posts", post.id); //working with current post, make this to update the post with likes and comments when they are added fresh

  /**
   * The updateComments function updates the commentsList based on the specific post
   * which we reference with postDocRef above from Firestore. When the user clicks the enter button to 
   * submit their comment that they typed in the textarea, this updateComments function is called
   * and we update the commentsList attached to this specific post to have the new comment the user
   * just submitted. To do this, we must load the original commentsList for this post from Firestore then append
   * a new comment object to this list and load it back to Firestore. We also set numerous state variables to save 
   * the updated commentsList to this post and a boolean to denote that comments have been updated. This will be 
   * important later in the return of the comments below.
   * 
   * @param e since this function was called to be the onSubmit function in the form below, we recieve an event by React
   * where we can do e.preventDefault() to prevent the site from reloading upon submission of the comment.
   */
  const updateComments = async (e) => {
    e.preventDefault();
    console.log("Comment button clicked");
    //first get current/original comments on post
    const docSnap = await getDoc(postDocRef);
    const prevComments = docSnap.data().commentsList;
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
    setUpdatedComments(true);
    setClickedToComment(false);
  }

    /**
   * The updateLikes function updates the likes attribute attached to this specific post
   * which we reference with postDocRef defined above. This involves retrieving this post
   * from Firestore then accessing its original likes attribute. We then incrememnt this like count
   * and load it back into Firestore. We also save a state variable with this new like count
   * which will be important below in the return of the Card component.
   * 
   * @param e since this function was called to be the onSubmit function in the form below, we recieve an event by React
   * where we can do e.preventDefault() to prevent the site from reloading upon submission of the comment.
   */
  
  const updateLikes = async () => {
    setUpdatedLikes(true);
    console.log("you pressed the like button");
    //first get current number of likes
    const docSnap = await getDoc(postDocRef);
    const prevLikes = docSnap.data().likes;
    //update the likes to firebase
    const update = await updateDoc(postDocRef, {likes: prevLikes + 1});
    setLikes(prevLikes + 1);
  };

    /**
     * Note: when returning a post with updated comments and/or likes, we check the state variables to see 
     * if they have been recently updated. If so, we display the state variable to the user. Otherwise, 
     * we use the data that was loaded from Firestore. This is important so that a user does not have to reload the page
     * to see comments or updated likes. 
     * 
     * In addition, the textarea and form to submit a comment only appear if the user has clicked the comment button.
     */

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
        {post.workoutType && (
        <div className="workoutType">
        <span className="tag">{post.workoutType}</span>
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
    <button className="cancel"  onClick={cancelAction}>Cancel</button> 
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
