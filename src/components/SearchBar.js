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
  
const formatString = (string) => {
  return string.replace(/\s/g, "").toLowerCase();
};
  
const getData = async (event) => {
  event.preventDefault();
  const formattedString = formatString(workout);
  console.log(formattedString); 
  
  const q = query(collection(db, "posts"), where("formattedWorkoutType", "==", formattedString));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    alert("No posts found with workout type: " + workout);
  } else {
    const updatedPostList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPostList(updatedPostList)  
    navigate("/searchresults", { state: { postList: updatedPostList } });
    console.log(updatedPostList)
  }
};

const navigate = useNavigate();
  return (
    <Container className="my-0 py-0" id="searchContainer">
      <Row>
        <Col sm={6} >
          <Form className="d-flex my-0 py-0">
            <Form.Control
              type="search"
              placeholder="Search for a workout..."
              className="me-2 my-0 py-0"
              aria-label="Search"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
            />
            <button className="searchButton my-0 py-0" onClick={getData} > Search </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}