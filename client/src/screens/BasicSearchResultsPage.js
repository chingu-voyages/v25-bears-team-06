import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import dummyData from "../dummyData";
import SingleBookCard from "../components/SingleBookCard";
// TODO

// 1. import searchbox component to filter displayed data
// import BasicSearchBox from "../components/BasicSearchBox"

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
  const word = "appl";
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>page to display basic search results</h1>

      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>

      <h2> with filter function </h2>
      {dummyData
        .filter(
          (book) => book.title.includes(word) || book.author.includes("berr"),
        )
        .map((filteredBook) => (
          <div>
            <SingleBookCard
              title={filteredBook.title}
              author={filteredBook.author}
              thumbnail={filteredBook.thumbnail}
            />
          </div>
        ))}
    </div>
  );
};

export default BasicSearchResultsPage;
