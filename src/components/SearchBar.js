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

/**
 * The SearchBar component provides a user interface for searching posts by workout type.
 * It leverages React Bootstrap for styling and layout. The component interacts with Firebase Firestore
 * to query posts based on the user's search input. On submission, it navigates to a search results page
 * with the matching posts. The search is case-insensitive and whitespace-agnostic.
 * 
 * @returns {JSX.Element} A styled search bar that allows users to search for posts by workout type.
 */

export default function SearchBar() {
  const[postList, setPostList] = useState([]);
  const[workout, setWorkout] = useState("");

  /**
   * Formats the given string by removing spaces and converting it to lowercase.
   * This standardization helps in matching the search input with the database entries.
   * 
   * @param {string} string The input string to format.
   * @returns {string} The formatted string.
   */
const formatString = (string) => {
  return string.replace(/\s/g, "").toLowerCase();
};


  /**
   * Handles the search operation when the search button is clicked. It prevents the default form submission behavior,
   * formats the workout type input, constructs a query for the Firestore database, and fetches the matching documents.
   * If no documents are found, it alerts the user. Otherwise, it updates the state with the found posts and navigates
   * to the search results page.
   * 
   * @param {Event} event The event object representing the form submission.
   */
const getData = async (event) => {
  event.preventDefault();
  const formattedString = formatString(workout);
  
  const q = query(collection(db, "posts"), where("formattedWorkoutType", "==", formattedString));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    alert("No posts found with workout type: " + workout);
  } else {
    const updatedPostList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPostList(updatedPostList)  
    navigate("/searchresults", { state: { postList: updatedPostList } });
  }
};

const navigate = useNavigate();
  return (
    <Container className="my-0 py-0" id="searchContainer">
      <Row>
        <Col sm={10} >
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
