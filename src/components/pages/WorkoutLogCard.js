import React, { useState } from 'react';
import { getDoc, getDocs, collection, updateDoc, doc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const emptyWorkoutLogCard = {
    day: "day of week",
    exercise: "exercise type",
    goal: "goal",
    isGoalMet: "true/false",
};

function WorkoutLogCard({log}) {
    console.log("Here is the actual workoutLog object", log);
    return (
        <div>
        {log.map((index) => (
          <div className="workoutLog"> 
            {index.day}
            {index.goal}
            {index.exercise}
            {index.isGoalMet}
          </div>
        ))} 
        </div>
    );
} 

export default WorkoutLogCard; 