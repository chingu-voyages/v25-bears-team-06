import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import BasicSearchResultsPage from "./screens/BasicSearchResultsPage";
import BookInfoPage from "./screens/BookInfoPage";
import AboutPage from "./screens/AboutPage";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Header />
        <Switch>
          <Route exact path="/basicsearch" component={BasicSearchResultsPage} />
          <Route path="/book/:id" component={BookInfoPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
