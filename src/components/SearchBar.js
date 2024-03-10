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

const getData = async (event) => {
  event.preventDefault();

  const keyword = workout.toLowerCase(); 

  if (!keyword) {
    alert("Please enter an input to search for workouts");
    return;
  }

  const q = collection(db, "posts");
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    alert("No workout type found");
  } else {
    const allPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // Filter posts based on the keyword
    const matchingPosts = allPosts.filter((post) =>
      post.workoutType.toLowerCase().includes(keyword)
    );

    if (matchingPosts.length === 0) {
      alert("No matching workout type found");
    } else {
      setPostList(matchingPosts);
      navigate("/searchresults", { state: { postList: matchingPosts } });
      console.log(matchingPosts);
    }
  }


  
};

const navigate = useNavigate();
  return (
    <Container className="mt-5" id="searchContainer">
      <Row>
        <Col sm={8}>
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