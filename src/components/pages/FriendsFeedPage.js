import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../auth/FirebaseUtils";
import Navbar from "../Navbar";
import Card from "../Card";
import "./FriendsFeedPage.css";

export const FriendsFeedPage = (posts) => {
  const currentUser = useAuth();
  const usersRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");
  const [currentUserFriendsRef, setCurrentUserFriendsRef] = useState("");
  const [friendsUIDList, setFriendsUIDList] = useState([]);
  const [postList, setPostList] = useState([]);

  // Get current user's friend collection reference 
  useEffect(() => {
    const getCurrentUserRefs = async () => {
      // Ensure the user is signed in with useAuth
      if (currentUser) {
        try {
          setCurrentUserFriendsRef(
            collection(usersRef, currentUser.uid, "friends")
          );
        } catch (error) {
          console.log("Error getting current user refernce: ", error);
        }
      }
    };
    getCurrentUserRefs();
  }, [currentUser]);

  // Query through friend collection to find active friends 
  useEffect(() => {
    const getFriendsUIDList = async () => {
      let tempFriendsUIDList = [];
      if (currentUserFriendsRef) {
        const q = query(
          currentUserFriendsRef,
          where("friendStatus", "==", "requestAccepted")
        );
        const querySnapshot = await getDocs(q);
        tempFriendsUIDList = querySnapshot.docs.map((doc) => doc.id);
      }
      setFriendsUIDList(tempFriendsUIDList);
    };
    getFriendsUIDList();
  }, [currentUserFriendsRef]);

  // Get posts who's author ID's are in the list of user's friends
  useEffect(() => {
    const getPosts = async () => {
      if (friendsUIDList.length) {
        const q = query(
          postsCollectionRef,
          where("author.id", "in", friendsUIDList)
        );
        const data = await getDocs(q);
        const tempPostList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPostList(tempPostList);
      }
    };
    getPosts();
  }, [friendsUIDList]);

  return (
    <div className="friendsfeedpage">
      <Navbar />
      <div className="postlist">
      {postList.length > 0 ? (
        postList.map((post) => (
          <div className="Post" key={post.id}> {/* Move the key to the first element inside map */}
            <Card post={post} />
          </div>
        ))
      ) : (
        <p>No posts to display</p> // This is displayed if postList is empty
      )}
      </div>
    </div>
  );
};

export default FriendsFeedPage;
