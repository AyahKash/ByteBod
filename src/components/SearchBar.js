import { Col, Container, Form, Row } from "react-bootstrap";
import "./SearchBar.css"
import Button from "./Button";

export default function SearchBar() {
  return (
    <Container className="mt-5" id="searchContainer">
      <Row>
        <Col sm={6}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Add a Friend..."
              className="me-2"
              aria-label="Search"
            />
            <button className="searchButton"> Search </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}