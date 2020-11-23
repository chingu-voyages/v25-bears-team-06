import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import dummyData from "../dummyData";
import SingleBookCard from "../components/SingleBookCard";
import { SearchContext } from "../Context";

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
  const history = useHistory();
  const { value, setValue } = useContext(SearchContext);

  const searchTerm = value;
  // setValue is updated in basicSearchBox.js
  // eslint-disable-next-line no-unused-expressions
  setValue;

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Search Results Page</h1>
      <h2>
        Authors and titles that contain:{" "}
        <span style={{ color: "red" }}>{value}</span>
      </h2>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>

      {dummyData
        .filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((filteredBook) => (
          <div>
            <SingleBookCard
              key={filteredBook.id}
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
