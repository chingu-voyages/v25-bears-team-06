import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/HeaderFooter/Header";
import Footer from "./components/Footer";
import DashboardPage from "./screens/DashboardPage";
import SearchResultsPage from "./screens/SearchResultsPage";
import BookInfoPage from "./screens/BookInfoPage";
import AboutPage from "./screens/AboutPage";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";
import PageNotFound from "./screens/PageNotFound";
import { SearchContext, AuthContext } from "./Context";
import ProtectedRoute from "./components/ProtectedRoute";

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
  const [tokenExpired, setTokenExpired] = useState(false);

  const login = ({ email, token, displayName, userId }) => {
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("displayName", displayName);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", userId);
    setTokenExpired(false);
    setUser({
      email,
      token,
      displayName,
      userId,
    });
  };

  const logout = () => {
    setQuery("");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            user,
            setUser,
            tokenExpired,
            onTokenExpired: () => {
              setTokenExpired(true);
              logout();
            },
            login,
            logout,
          }}
        >
          <SearchContext.Provider value={{ query, setQuery }}>
            <Header />
            <main>
              <Switch>
                <Route exact path="/" component={AboutPage} />
                <Route
                  exact
                  path="/searchresults"
                  component={SearchResultsPage}
                />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/bookinfo/:id" component={BookInfoPage} />
                <ProtectedRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
                <ProtectedRoute
                  exact
                  path="/dashboard/myinventory"
                  component={DashboardPage}
                />
                <ProtectedRoute
                  exact
                  path="/dashboard/checkedout"
                  component={DashboardPage}
                />
                <ProtectedRoute
                  exact
                  path="/dashboard/waitlisted"
                  component={DashboardPage}
                />
                <Route component={PageNotFound} />
              </Switch>
            </main>
            <Footer />
          </SearchContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
