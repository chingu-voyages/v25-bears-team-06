import { useState } from "react";
import { useHistory } from "react-router-dom";

const useMutation = (query, token, onTokenExpired) => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutation(variables) {
    setLoading(true);
    setError(null);
    setData(null);

    const reqBody = {
      query,
      variables,
    };

    const url =
      process.env.REACT_APP_API_URL || "http://localhost:5000/graphql";

    const authorization = token ? `Bearer ${token}` : null;

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
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

        if (errorMessage.includes("JWT Expired")) {
          onTokenExpired();
        }
        setError(errorMessage);
      } else if (result.data) {
        setData(result.data);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(`Something went wrong. Please try again later. ${err}`);
    }
  }

  return [mutation, { data, loading, error }];
};

export default useMutation;
