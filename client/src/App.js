import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import SearchResultsPage from "./screens/SearchResultsPage";
import BookInfoPage from "./screens/BookInfoPage";
import AboutPage from "./screens/AboutPage";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";
import UploadBookPage from "./screens/UploadBookPage";
import MyInventoryPage from "./screens/MyInventoryPage";
import { SearchContext, AuthContext } from "./Context";

function App() {
  // sharing searchbox user input value across pages with context
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(
    localStorage.getItem("email") &&
      localStorage.getItem("token") &&
      localStorage.getItem("displayName") &&
      localStorage.getItem("userId")
      ? {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          displayName: localStorage.getItem("displayName"),
          userId: localStorage.getItem("userId"),
        }
      : null,
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ user, setUser }}>
          <SearchContext.Provider value={{ query, setQuery }}>
            <Header />
            <Switch>
              <Route
                exact
                path="/searchresults"
                component={SearchResultsPage}
              />
              <Route exact path="/bookinfo" component={BookInfoPage} />
              <Route path="/uploadbook" component={UploadBookPage} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/myinventory" component={MyInventoryPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </SearchContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
