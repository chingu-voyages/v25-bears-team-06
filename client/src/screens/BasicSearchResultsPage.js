import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import dummyData from "../dummyData";
import SingleBookCard from "../components/SingleBookCard";

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
  // TODO replace this hardcoded word with the value the user entered in "basicSearchBox.js"
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

      <p> using a case insensitive filter function </p>
      {dummyData
        .filter(
          (book) =>
            book.title.toLowerCase().includes(word.toLowerCase()) ||
            book.author.toLowerCase().includes("LEMON".toLowerCase()),
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
