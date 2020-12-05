/* eslint-disable no-unused-vars */
import { createContext } from "react";

const AuthContext = createContext({
  user: {
    token: null,
    userId: null,
    email: null,
    displayName: null,
  },
  setUser: (user) => {},
});

const SearchContext = createContext({
  query: "",
  setQuery: (query) => {},
});

export { AuthContext, SearchContext };
