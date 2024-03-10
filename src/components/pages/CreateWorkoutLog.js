import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Navbar from "../Navbar";
import "./CreateWorkoutLog.css";
import workoutlog2 from "../../images/workoutlog2.png"


export const CreateWorkoutLog = () => {
    const workoutLogCollectionRef = collection(db, "workoutLog");
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([
        { day: 'Monday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Tuesday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Wednesday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Thursday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Friday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Saturday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Sunday', exercise: '', goal: '', isGoalMet: false },
      ]);

    const createWorkoutLog = async (event) => {
        event.preventDefault();
        const newWorkoutLogData= { 
            authorID: auth.currentUser.uid,
            workouts,
        };
        try {
            await addDoc(workoutLogCollectionRef, newWorkoutLogData)
        } catch (error) {
            console.log("Error adding post to database: ", error)
          }
         navigate("/profile/workoutlogs");
    };

    
    
      const handleInputChange = (index, field, value) => {
        const newWorkouts = [...workouts];
        newWorkouts[index][field] = value;
        setWorkouts(newWorkouts);
      };
    
      const handleCheckboxChange = (index) => {
        const newWorkouts = [...workouts];
        newWorkouts[index].isGoalMet = !newWorkouts[index].isGoalMet;
        setWorkouts(newWorkouts);
      };

      const handleCancel = () => {
        setWorkouts([
            { day: 'Monday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Tuesday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Wednesday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Thursday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Friday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Saturday', exercise: '', goal: '', isGoalMet: false },
            { day: 'Sunday', exercise: '', goal: '', isGoalMet: false },
        ]);
    };
    
      return (
        <div className="workout planner">
        <Navbar />
        <div class="header">
          <h1>WORKOUT LOG</h1>
          <div class="icons">
          <img src={workoutlog2}/>
      </div>
      </div>
        <table>
          <thead>
            <tr>
              <th>DAY</th>
              <th>EXERCISE</th>
              <th>GOAL</th>
              <th>GOAL MET</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.day}</td>
                <td>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={workout.exercise}
                      onChange={(e) => handleInputChange(index, 'exercise', e.target.value)}
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={workout.goal}
                      onChange={(e) => handleInputChange(index, 'goal', e.target.value)}
                    />
                  </div>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={workout.isGoalMet}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={createWorkoutLog}>Update</button>
        <button onClick={handleCancel}>Cancel</button>


      </div>
    );
  };
export default CreateWorkoutLog;
