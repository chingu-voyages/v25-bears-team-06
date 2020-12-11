/* eslint-disable no-unused-vars */
import { createContext } from "react";

const AuthContext = createContext({
  user: {
    token: null,
    userId: null,
    email: null,
    displayName: null,
  },
  tokenExpired: false,
  setUser: (user) => {},
  onTokenExpired: () => {},
  login: ({ email, token, displayName, userId }) => {},
  logout: (isTokenExpired) => {},
});

const SearchContext = createContext({
  query: "",
  setQuery: (query) => {},
});

export { AuthContext, SearchContext };
