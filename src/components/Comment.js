import React from "react";
import "./Comment.css";
import profilePhoto from "../images/ProfilePhoto.png";

//below is an emptyComment as a default if one is passed incorrectly
const emptyComment = {
    text: "comment text",
    author: "comment author",
    commentDate: "commentDate",
};

/**
 * The Comment component renders a stylish comment that is attached to a specific post.
 * This component is rendered in Card.js. Using the commentObj passed to it which contains 
 * text, author, and commentDate objects which are created in Card.js, the user can see 
 * the profile picture, name, comment text, and comment date of any comment attached to a post.
 * 
 * @param commentObj the comment object itself which is passed from a list of comment objects in Card.js
 * @return Renders a comment JSX component that is attached to a post
 */

function Comment({commentObj}){
    return (
    <div className="comment">
        <div className="heading">
        <img className="img"
          src={commentObj.author.photoUrl || profilePhoto} 
          alt="Profile"
          width="50"
          style={{ marginRight: "0.75em" }}
        />
        <div>
          <div className="author">{commentObj.author.name ? commentObj.author.name : "Author Name"}</div>
        </div>
      </div>
        <p>{commentObj.text}</p>
        <div className="date">Comment Date: {commentObj.date}</div>
    </div>
    );
}

export default Comment;