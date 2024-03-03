import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "../Navbar";
import Button from "../Button";
import Card from "../Card";
import "./HomePage.css"

export const HomePage = (props) => {
  const navigate = useNavigate();
  
  const setLikes = () =>{
    //somehow get likes of a certain post from firebase, use a posts id
    //increment likes
    //repost likes to firebase
  }
  /* Commenting out firebase syncing until we figure out read issue:

  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getPosts(); 
  });
  */

  /* Using filler data in mean time: */
  const postList = props.postsList;
  console.log("This is the post list", postList);
  // const postList = [
  //   {
  //     title: "Post One",
  //     postText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //     id: "1",
  //   },
  //   {
  //     title: "Post Two",
  //     postText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //     id: "2",
  //   },
  //   {
  //     title: "Post Three",
  //     postText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //     id: "3",
  //   },
  //   {
  //     title: "Post Four",
  //     postText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam dui, pellentesque a pretium nec, consequat et risus. Aliquam posuere mollis mauris. Sed eget sapien ut quam condimentum luctus...",
  //     id: "4",
  //   },
  // ];

  return (
    <div className="homepage">
      <Navbar />
      <Button style={{ margin: "1em 1em" }} onClick={() => navigate("/createpost")}>
        Create a Post
      </Button>
      <div className="postlist">
        {postList.map((post) => (
          <div className="Post">
            <Card incrementLikes={setLikes} key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};
