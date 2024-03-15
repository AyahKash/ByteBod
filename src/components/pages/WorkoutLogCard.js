import React, { useState } from 'react';
import { getDoc, getDocs, collection, updateDoc, doc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./WorkoutLogCard.css";

//default workout object if one is not passed correctly to the WorkoutLogCard component
const emptyWorkoutLogCard = {
    day: "day of week",
    exercise: "exercise type",
    goal: "goal",
    isGoalMet: "true/false",
};

/**
* Users can create their own workout log, which displays their workout plans for the week. These logs
* are dynamically added to the workout log page. This component styles the log information created
* in CreateWorkoutLog.js into a card that is displayed after a user submits a workout log form.
*/
function WorkoutLogCard({log}) {
    const formatDateTime = (timestamp) => {
      if (timestamp && timestamp.seconds) {
          const date = new Date(timestamp.seconds * 1000);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
      return "";
  };

  return (
      <div>
          <table className="workoutLogTable">
              <thead>
                  <tr>
                      <th>Day</th>
                      <th>Exercise</th>
                      <th>Goal</th>
                      <th>Goal Met</th>
                  </tr>
              </thead>
              <tbody>
                  {log.map((item, index) => (
                      <tr key={index}>
                          <td>{item.day}</td>
                          <td>{item.exercise}</td>
                          <td>{item.goal}</td>
                          <td>{item.isGoalMet ? 'Yes' : 'No'}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}


export default WorkoutLogCard; 
