import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Button from "../Button";
import Card from "../Card";

/*
displays the search results based which are queried based off of workout type
*/
export const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postList } = location.state || {};

  return (
    <div>
      <Navbar />
      <div className="search-results">
        {postList.map((post) => (
          <div className="SearchResults" key={post.id}>
            <Card key={post.id} post={post} />
          </div>
        ))}
      </div>
      <Button style={{ margin: "1em 1em" }} onClick={() => navigate("/homepage")}>
        Go back to home 
      </Button>
    </div>
  );
};

export default SearchResults;
