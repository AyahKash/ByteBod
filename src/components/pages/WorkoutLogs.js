import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../auth/FirebaseUtils"; 
import Navbar from "../Navbar";
import Button from "../Button";
import WorkoutLogCard from "./WorkoutLogCard";
import "./WorkoutLogs.css"


export const WorkoutLogs = () => {
    const navigate = useNavigate();
    const [workoutLogList, setworkoutLogList] = useState([]); 
    const workoutLogCollectionRef = collection(db, "workoutLog"); 
    const currentUser = useAuth();
    
    useEffect(() => {
        const getworkoutLog = async () => {
          let tempWorkoutLogList = [];
          if (currentUser) {
          const currentUserUID = currentUser.uid; 
          const q = query(
            workoutLogCollectionRef, 
            where("authorID", "==", currentUserUID)
            ); 
          const data = await getDocs(q);
          tempWorkoutLogList = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
          }
          setworkoutLogList(tempWorkoutLogList);
        };
        getworkoutLog(); 
    }, [currentUser]);

    const formatDateTime = (timestamp) => {
      if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
      return "";
  };

    return (
    <div>
        
        <Navbar />
        <Button onClick={() => navigate("/profile/createworkoutlog")}>Add a New Workout Log</Button>
        <div className="homepage"> {workoutLogList.map((workoutLog) => (
          <div className="workoutLog"> 
            <WorkoutLogCard log={workoutLog.workouts} key={workoutLog.id}/>
          </div>
        ))} 
        </div> 
        
        
    </div>
    );
}; 
