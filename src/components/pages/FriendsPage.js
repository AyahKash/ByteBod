import React, { useEffect, useState } from "react";
import {
  getDocs,
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuth } from "../auth/FirebaseUtils";
import profilePhoto from "../../images/ProfilePhoto.png"; 
import Navbar from "../Navbar";
import Button from "../Button";
import "./FriendsPage.css";

export const FriendsPage = (props) => {
  const usersRef = collection(db, "users");
  const currentUser = useAuth();
  const [currentUserFriendRequestsRef, setCurrentUserFriendRequestsRef] = useState("");
  const [currentUserFriendsRef, setCurrentUserFriendsRef] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [listState, setListState] = useState();
  const [requestSendMessage, setRequestSendMessage] = useState("");

  // Query to find a user given the email entered
  const findTargetUserFromEmail = async () => {
    const q = query(usersRef, where("email", "==", targetEmail));
    setTargetEmail("");
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("No user found with provided email");
    } else {
      return querySnapshot.docs[0].id;
    }
  };

  // Send a friend request
  const sendFriendRequest = async (event) => {
    
    // Prevent a rerender 
    event.preventDefault();

    // Get target user document from email
    let targetUserId;
    try {
      targetUserId = await findTargetUserFromEmail();
    } catch (error) {
      console.log(error.message);
      setRequestSendMessage("No User Found");
      return;
    }

    const targetUserFriendRequestsRef = collection(
      usersRef,
      targetUserId,
      "friendRequests"
    );

    // Add the docs for each user
    try {
      await setDoc(doc(currentUserFriendRequestsRef, targetUserId), {
        friendStatus: "requestSent",
      });
      await setDoc(doc(targetUserFriendRequestsRef, auth.currentUser.uid), {
        friendStatus: "requestReceived",
      });
      console.log("Request sent");
      setRequestSendMessage("Friend Request Sent!");
    } catch (error) {
      console.log("Error sending friend request: ", error);
    }
  };

  // Accept or reject a friend request
  const respondToRequest = async (targetUserId, response) => {
    const targetUserFriendRequestsRef = collection(
      usersRef,
      targetUserId,
      "friendRequests"
    );
    const targetUserFriendsRef = collection(
      usersRef,
      targetUserId,
      "friends"
    );

    // Add the docs for each user
    if (response) {
      try {
        await setDoc(doc(currentUserFriendRequestsRef, targetUserId), {
          friendStatus: "requestAccepted",
        });
        await setDoc(doc(targetUserFriendRequestsRef, auth.currentUser.uid), {
          friendStatus: "requestAccepted",
        });
        await setDoc(doc(currentUserFriendsRef, targetUserId), {
          friendStatus: "requestAccepted",
        });
        await setDoc(doc(targetUserFriendsRef, auth.currentUser.uid), {
          friendStatus: "requestAccepted",
        });

        // Alert the lists to rerender
        setListState(!listState);
      } catch (error) {
        console.log("Error accepting friend request: ", error);
      }
    } else {
      try {
        await setDoc(doc(currentUserFriendRequestsRef, targetUserId), {
          friendStatus: "requestRejected",
        });
        await setDoc(doc(targetUserFriendRequestsRef, auth.currentUser.uid), {
          friendStatus: "requestRejected",
        });
        setListState(!listState);
      } catch (error) {
        console.log("Error rejecting friend request: ", error);
      }
    }
  };

  // Remove a friend
  const removeFriend = async (targetUserId) => {
    const targetUserFriendRequestsRef = collection(
      usersRef,
      targetUserId,
      "friendRequests"
    );
    const targetUserFriendsRef = collection(
      usersRef,
      targetUserId,
      "friends"
    );

    // Modify the docs for each user
    try {
      await setDoc(doc(currentUserFriendRequestsRef, targetUserId), {
        friendStatus: "removed",
      });
      await setDoc(doc(targetUserFriendRequestsRef, auth.currentUser.uid), {
        friendStatus: "removed",
      });
      await setDoc(doc(currentUserFriendsRef, targetUserId), {
        friendStatus: "removed",
      });
      await setDoc(doc(targetUserFriendsRef, auth.currentUser.uid), {
        friendStatus: "removed",
      });
      setListState(!listState);
    } catch (error) {
      console.log("Error removing friend: ", error);
    }
  };

  // Fetch current user doc reference and set references
  useEffect(() => {
    const getCurrentUserRefs = async () => {

      // Ensure the current user is signed in 
      if (auth.currentUser) {
        try {
          setCurrentUserFriendRequestsRef(
            collection(usersRef, auth.currentUser.uid, "friendRequests")
          );
          setCurrentUserFriendsRef(
            collection(usersRef, auth.currentUser.uid, "friends")
          );
        } catch (error) {
          console.log("Error getting current user refernce: ", error);
        }
      }
    };
    getCurrentUserRefs();
  }, [currentUser]);

  // Fetch pending friend request list from Firestore
  useEffect(() => {
    const getRequests = async () => {
      const tempRequestList = [];

      // Ensure the friend request reference is set
      if (currentUserFriendRequestsRef) {
        const q = query(
          currentUserFriendRequestsRef,
          where("friendStatus", "==", "requestReceived")
        );
        const querySnapshot = await getDocs(q);

        /* Store just the ID's of the friend request documents as these 
          correspond to the UID's of the friend documents in the users
          collection */
        const requestDocumentIds = querySnapshot.docs.map((doc) => doc.id);

        // Now fetch each corresponding user documents
        for (const documentId of requestDocumentIds) {
          const docRef = doc(usersRef, documentId);
          const docSnapshot = await getDoc(docRef);
          if (!docSnapshot) {
            throw new Error("No user found with proved UID");
          } else {
            const data = docSnapshot.data();
            data.id = docSnapshot.id;
            tempRequestList.push(data);
          }
        }
      }
      setRequestList(tempRequestList);
    };
    getRequests();
  }, [currentUserFriendRequestsRef, listState]);

  // Fetch friend  list from Firestore
  useEffect(() => {
    const getFriends = async () => {
      const tempFriendsList = [];

      // Ensure the friend reference is set
      if (currentUserFriendsRef) {
        const q = query(
          currentUserFriendsRef,
          where("friendStatus", "==", "requestAccepted")
        );
        const querySnapshot = await getDocs(q);

        // Again, just store the document ID's
        const friendDocumentIds = querySnapshot.docs.map((doc) => doc.id);

        // Fetch the corresponding user documents
        for (const documentId of friendDocumentIds) {
          const docRef = doc(usersRef, documentId);
          const docSnapshot = await getDoc(docRef);
          if (!docSnapshot) {
            throw new Error("No user found with proved UID");
          } else {
            const data = docSnapshot.data();
            data.id = docSnapshot.id;
            tempFriendsList.push(data);
          }
        }
      }
      setFriendList(tempFriendsList);
    };
    getFriends();
  }, [currentUserFriendsRef, listState]);

  return (
    <div className="friendspage">
      <Navbar />
      <div className="friendspage-container">
        {/* List of Friends */}
        <div className="left-side">
          <h4>Your Friends</h4>
          <div className="friends-list">
            {friendList.map((friend) => (
              <div className="friend-card">
                <div className="text-container">
                    <img
                    src={friend.photoURL ? friend.photoURL : profilePhoto}
                    alt="Profile"
                    className="avatar-small"
                    />
                  <div> {friend.name} </div>
                </div>
                <div className="button-container">
                  <Button
                    className="button light"
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Send Request Card and List of Requests */}
        <div className="right-side">
          <h4>Pending Requests</h4>
          <div className="request-list">
            {requestList.map((request) => (
              <div className="friend-card">
                <div className="text-container">
                    <img
                    src={request.photoURL ? request.photoURL : profilePhoto}
                    alt="Profile"
                    className="avatar-small"
                    />
                  <div> {request.name} </div>
                </div>
                <div className="button-container">
                  <Button
                    className="button light"
                    onClick={() => respondToRequest(request.id, true)}
                  >
                    Accept
                  </Button>
                  <div className="barrier"></div>
                  <Button
                    className="button light"
                    onClick={() => respondToRequest(request.id, false)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <form className="request-form" onSubmit={sendFriendRequest}>
            <h4 className="form-title">Send a Friend Request</h4>
            <div className="form-group">
              <input
                className="form-label"
                placeholder="Email..."
                type="email"
                onChange={(event) => {
                  setTargetEmail(event.target.value);
                }}
                value={targetEmail}
              />
              <Button type="submit" className="button sr">Send Request</Button>
            </div>
            <div> {requestSendMessage} </div>
          </form>
        </div>
      </div>
    </div>
  );
};
