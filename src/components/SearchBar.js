import { Col, Container, Form, Row } from "react-bootstrap";
import "./SearchBar.css"
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import React, {useState } from "react";


export default function SearchBar() {
  const[postList, setPostList] = useState([]);
  const[workout, setWorkout] = useState("");
  
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
const getData = async (event) => {
  event.preventDefault();
  const capitalizedWorkout = capitalizeFirstLetter(workout.toLowerCase());
  const q = query(collection(db, "posts"), where("workoutType", "==", capitalizedWorkout));
  //const q = query(collection(db, "posts"), where("workoutType", "==", workout.toLowerCase()));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    alert("No workout type found");
  } else {
    const updatedPostList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPostList(updatedPostList)  
    navigate("/searchresults", { state: { postList: updatedPostList } });
    console.log(updatedPostList)
  }
};

const navigate = useNavigate();
  return (
    <Container className="mt-5" id="searchContainer">
      <Row>
        <Col sm={6}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for a workout type..."
              className="me-2"
              aria-label="Search"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
            />
            <button className="searchButton" onClick={getData} > Search </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}