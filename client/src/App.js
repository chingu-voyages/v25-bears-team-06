import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import BasicSearchResultsPage from "./screens/BasicSearchResultsPage";
import BookInfoPage from "./screens/BookInfoPage";
import AboutPage from "./screens/AboutPage";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";
import UploadBookButtonPage from "./screens/UploadBookButtonPage";
import UploadLiveSearchPage from "./screens/UploadBookLiveSearchPage";
import { SearchContext } from "./Context";

function App() {
  // sharing searchbox user input value across pages with context
  const [value, setValue] = useState("");

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={{ value, setValue }}>
          <Header />
          <Switch>
            <Route
              exact
              path="/basicsearch"
              component={BasicSearchResultsPage}
            />
            <Route path="/book/:id" component={BookInfoPage} />
            <Route path="/uploadbookbutton" component={UploadBookButtonPage} />
            <Route
              path="/uploadbooklivesearch"
              component={UploadLiveSearchPage}
            />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </SearchContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
