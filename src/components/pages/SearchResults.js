import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Button from "../Button";
import Card from "../Card";

export const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postList } = location.state || {};

  return (
    <div>
      <Navbar />
      <div className="postlist">
        {postList.map((post) => (
          <div className="Post" key={post.id}>
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
