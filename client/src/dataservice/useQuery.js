/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useQuery = ({ query, variables, token }) => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doQuery = async () => {
      setLoading(true);

      const reqBody = {
        query,
        variables,
      };

      const url =
        process.env.REACT_APP_API_URL || "http://localhost:5000/graphql";

      const authorization = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : null;

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization,
        },
        body: JSON.stringify(reqBody),
      };

      try {
        const response = await fetch(url, opts);

        if (!response.ok) {
          const { status } = response;

          history.replace(history.location.pathname, {
            errorStatusCode: status,
          });
        }

        const result = await response.json();

        if (result.errors) {
          const {
            errors: [message],
          } = result;

          const errorMessage =
            typeof message === "string" ? message : message.message;

          setError(errorMessage);
        } else if (result.data) {
          setData(result.data);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(`Something went wrong. Please try again later. ${err}`);
      }
    };
    doQuery();
  }, [JSON.stringify(variables), token]);

  return {
    loading,
    data,
    error,
  };
};

export default useQuery;
