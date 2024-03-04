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
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar";
import Button from "../Button";
import "./FriendsPage.css";

/* Implementation Notes:
    - currently you can: 
        - send a friend request
        - accept/reject a friend request
        - remove a friend 
    - each user gets two subcollections: friends and friendRequests
    - sending a request adds a document to the sender and target user's friendRequests collection 
    - accepting a request changes the status of both users' corresponding friendRequests docs AND adds a doc to each user's friends subcollection
    - rejecting a request changes the status of both users' corresponding friendRequests docs
    - removing a friend changes the status of both users' corresponding friendRequests docs AND changes the status if  each user's friends subcollection doc
    - (so with the current implementaiton documents are not removed at all for requests/removals, but we can change that if we want)
*/

export const FriendsPage = (props) => {
  const usersRef = collection(db, "users");
  const [targetEmail, setTargetEmail] = useState("");
  const [currentUserFriendRequestsRef, setCurrentUserFriendRequestsRef] = useState("");
  const [currentUserFriendsRef, setCurrentUserFriendsRef] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [listState, setListState] = useState();
  const [requestSendMessage, setRequestSendMessage] = useState("");

  // Listener to ensure user is logged in to before attempting to access:
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        setAuthUser(userCredential);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  // Find a user given the email entered:
  const findTargetUserFromEmail = async () => {
    const q = query(usersRef, where("email", "==", targetEmail));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("No user found with provided email");
    } else {
      return querySnapshot.docs[0].id;
    }
  };

  // Send a friend request:
  const sendFriendRequest = async (event) => {
    event.preventDefault();

    // get target user document:
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

    // add the docs:
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
    // TO DO: Figure out how to clear input field after click
  };

  // Accept or reject a friend request:
  const respondToRequest = async (targetUserId, response) => {
    const targetUserFriendRequestsRef = collection(
      usersRef,
      targetUserId,
      "friendRequests"
    );

    const targetUserFriendsRef = collection(usersRef, targetUserId, "friends");

    // add the docs:
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
        console.log("Request accpeted");
        setListState(!listState); // only purpose of this is to get the friends lists to rerender
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
        console.log("Request rejected");
        setListState(!listState);
      } catch (error) {
        console.log("Error rejecting friend request: ", error);
      }
    }
  };

  // Remove a friend:
  const removeFriend = async (targetUserId) => {
    const targetUserFriendRequestsRef = collection(
      usersRef,
      targetUserId,
      "friendRequests"
    );

    const targetUserFriendsRef = collection(usersRef, targetUserId, "friends");

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
      console.log("Friend removed");
      setListState(!listState);
    } catch (error) {
      console.log("Error removing friend: ", error);
    }
  };

  // Fetch current user doc reference and set references:
  useEffect(() => {
    const getCurrentUserRefs = async () => {
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
  }, [authUser]);

  // Fetch pending friend request list from Firestore:
  useEffect(() => {
    const getRequests = async () => {
      const tempRequestList = [];
      if (currentUserFriendRequestsRef) {
        const q = query(
          currentUserFriendRequestsRef,
          where("friendStatus", "==", "requestReceived")
        );
        const querySnapshot = await getDocs(q);
        const requestDocumentIds = querySnapshot.docs.map((doc) => doc.id);
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

  // Fetch friend  list from Firestore:
  useEffect(() => {
    const getFriends = async () => {
      const tempFriendsList = [];
      if (currentUserFriendsRef) {
        const q = query(
          currentUserFriendsRef,
          where("friendStatus", "==", "requestAccepted")
        );
        const querySnapshot = await getDocs(q);
        const friendDocumentIds = querySnapshot.docs.map((doc) => doc.id);
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
                <div className="text-container"> {friend.name} </div>
                <div className="button-container">
                  <Button
                    className="light"
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
                <div className="text-container"> {request.name} </div>
                <div className="button-container">
                  <Button
                    className="light"
                    onClick={() => respondToRequest(request.id, true)}
                  >
                    Accept
                  </Button>
                  <div className="barrier"></div>
                  <Button
                    className="light"
                    onClick={() => respondToRequest(request.id, false)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <hr className="hl"></hr>
          <form className="request-form" onSubmit={sendFriendRequest}>
            <h4 className="form-title">Send a Friend Request</h4>
            <div className="form-group">
              <label> User Email: </label>
              <input
                placeholder="Email..."
                type="email"
                onChange={(event) => {
                  setTargetEmail(event.target.value);
                }}
              />
            </div>
            <Button type="submit">Send Request</Button>
            <div> {requestSendMessage} </div>
          </form>
        </div>
      </div>
    </div>
  );
};
