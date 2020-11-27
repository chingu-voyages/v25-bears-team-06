import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import dummyData from "../dummyData";
import SingleBookCard from "../components/SingleBookCard";
import { SearchContext } from "../Context";

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
  const { value, setValue } = useContext(SearchContext);

  const searchTerm = value;
  // setValue is updated in basicSearchBox.js
  // eslint-disable-next-line no-unused-expressions
  setValue;

  return (
    <div>
      <h1>Search Results Page</h1>
      <Typography variant="subtitle1">
        Authors and titles that contain:{" "}
        <span style={{ color: "red" }}>{value}</span>
      </Typography>

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
