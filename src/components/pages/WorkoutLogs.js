import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "../Navbar";
import Button from "../Button";
import WorkoutLogCard from "./WorkoutLogCard";
import "./WorkoutLogs.css"


export const WorkoutLogs = () => {
    const navigate = useNavigate();
    const [workoutLogList, setworkoutLogList] = useState([]); 
    const workoutLogCollectionRef = collection(db, "workoutLog"); 
    console.log(workoutLogCollectionRef);
    useEffect(() => {
        const getworkoutLog = async () => {
          const data = await getDocs(workoutLogCollectionRef);
          setworkoutLogList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getworkoutLog(); 
        console.log(workoutLogList);
    }, [] );
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