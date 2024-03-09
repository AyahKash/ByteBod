import Button from "./Button";
import "./Card.css";
import React, { useState } from 'react';
import { getDocs, collection} from "firebase/firestore";
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
  workoutType: "Workout Type"

};
//for ayah testing
//db.collection("posts").doc(post.id).update({ likes: likes + 1 });

function Card({ post = emptyPost, incrementLikes }) {
  //const [title, setTitle] = useState("");
  const [likes, setLikes] = useState(0);
  const postsCollectionRef = collection(db, "posts", post.id); 

  const updateLikes = async () => {
    try {
      // Get the reference to the specific post document
      const postRef = db.collection("posts").doc(post.id);

      // Get the current likes count
      const doc = await postRef.get();
      if (doc.exists) {
        const postLikes = doc.data().likes || 0;

        // Update the likes count
        await postRef.update({ likes: postLikes + 1 });

        // Update the local state to reflect the updated likes count
        setLikes(postLikes + 1);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };


  // const updateLikes = async () => {
  //   console.log("updating likes!");
  //   try {
  //     const data = await getDocs(postsCollectionRef); 
  //     if (data.exists) {
  //       const postLikes = data.doc.data().likes || 0;
  //       setLikes(postLikes);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.error("Error getting document:", error);
  //   }

  //   //db.collection("posts").doc(post.id).update({ likes: likes + 1 });
  // };
  //for ayah testing
  // console.log("Here is the type", typeof(post.createAt))
  console.log(post.author)
  return (
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
      
      <div className="workoutType"> 
      Workout Type: <span>{post.workoutType}</span>
      </div>
      
      <div className="content">{post.postText}</div>
      {typeof(post.createAt) === 'string' && <div className="date">Post Date: {post.createAt}</div>}
      <div className="interaction">
        <Button onClick={updateLikes} className="button like">&#128077;</Button>
        <Button className="button comment">&#128172;</Button>
      </div>
    </div>
  );
}

export default Card;
