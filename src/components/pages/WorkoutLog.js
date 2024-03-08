import React, { useState } from 'react';
import Navbar from "../Navbar";

export const WorkoutLog = () => {
    const [workouts, setWorkouts] = useState([
        { day: 'Monday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Tuesday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Wednesday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Thursday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Friday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Saturday', exercise: '', goal: '', isGoalMet: false },
        { day: 'Sunday', exercise: '', goal: '', isGoalMet: false },
      ]);
    
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
    
      return (
        <div className="workout planner">
        <Navbar />
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Exercise</th>
              <th>Goal</th>
              <th>Goal Met</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.day}</td>
                <td>
                  <input
                    type="text"
                    value={workout.exercise}
                    onChange={(e) => handleInputChange(index, 'exercise', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={workout.goal}
                    onChange={(e) => handleInputChange(index, 'goal', e.target.value)}
                  />
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
        <button onClick={null}>Update</button>
        </div>
      );
    };
export default WorkoutLog;
