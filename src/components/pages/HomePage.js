import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "../Navbar";
import Button from "../Button";
import Card from "../Card";
import "./HomePage.css"

/**
 * The first page shown to the user when they log in. This page displays public
 * post information. This is the user's home page/feed.
 */

export const HomePage = (posts) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  // display posts in order of date created when page is rendered
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, orderBy('createAt', 'desc')));
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getPosts(); 
  }, [] );

  return (
    <div className="home-page">
      <Navbar />
      <Button style={{ margin: "1em 1em" }} onClick={() => navigate("/createpost")}>
        Create a Post
      </Button>
      <div className="postlist">
        {postList.map((post) => (
          <div className="Post">
            <Card key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;