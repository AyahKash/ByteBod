import React from "react";
import "./Comment.css";
import profilePhoto from "../images/ProfilePhoto.png";

const emptyComment = {
    text: "comment text",
    author: "comment author",
    commentDate: "commentDate",
};

function Comment({commentObj}){
    console.log("Here is the recieved comment object", commentObj);
    console.log("Here is the recieved comment TEXT",commentObj.text);
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