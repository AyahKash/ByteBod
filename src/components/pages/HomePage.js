import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "../Navbar";
import Button from "../Button";
import "./HomePage.css"

export const HomePage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getPosts(); 
  });
  return (
    <div>
      <Navbar />
      <Button onClick={() => navigate("/createpost")}>Create a Post</Button>
      <div className="homepage"> {postList.map((post) => {
        return (
        <div className="Post"> 
          <div className="postHeader"> 
            <h3>{post.title}</h3> 
          </div>
          <div className="postText"> 
            {post.postText}
          </div>
        </div>
        );
      })} 
      </div>
    </div>
  )
};