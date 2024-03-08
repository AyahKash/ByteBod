import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "../Navbar";
import Button from "../Button";
import Card from "../Card";
import "./HomePage.css"

export const HomePage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, orderBy('createAt', 'desc')));
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getPosts(); 
  }, [] );
  
  //for Ayah testing purposes:
  console.log("Here is the postList", postList);

  return (
    <div className="homepage">
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

