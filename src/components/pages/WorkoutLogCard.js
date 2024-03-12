import React, { useState } from 'react';
import { getDoc, getDocs, collection, updateDoc, doc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./WorkoutLogCard.css";

const emptyWorkoutLogCard = {
    day: "day of week",
    exercise: "exercise type",
    goal: "goal",
    isGoalMet: "true/false",
};

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
