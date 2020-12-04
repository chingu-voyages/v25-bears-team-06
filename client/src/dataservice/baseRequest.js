export default async function baseRequest(opts) {
  const url = process.env.REACT_APP_API_URL || "http://localhost:5000/graphql";
  const response = await fetch(url, opts);
  const result = await response.json();
  if (result.errors) {
    const {
      errors: [message],
    } = result;
    return message;
  }
  const { data } = result;
  return data;
}
