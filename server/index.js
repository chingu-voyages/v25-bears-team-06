require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const { response } = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

// if (process.env.NODE_ENV === "production") {
//   //gets static content route for heroku once npm build is run
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

// GraphQL Route
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

//search Google Books API
// app.get("/search", async (req, res) => {
//   try {
//     const key = process.env.GOOGLE_BOOKS_API_KEY;
//     console.log(key);
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${key}`
//     );
//     const json = await response.json();
//     const { id, volumeInfo } = json;
//     console.log(id, volumeInfo);

//     res.json(json);
//     // console.log(json);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// app.post("/load", async (req, res) => {
//   try {
//     const key = "AIzaSyBUcnhG0FWf7elsXN1sDMUR8CJhQ8NASrI";
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${key}`
//     );
//     const json = await response.json();
//     const { id, volumeInfo } = json;
//     console.log(id, volumeInfo);
//     const newBook = await pool.query(
//       "INSERT INTO books (id, volumeinfo) VALUES($1,$2) RETURNING *",
//       [id, volumeInfo]
//     );
//     res.json(newBook.rows[0]);
//   } catch (err) {
//     console.error(err);
//   }
// });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cuggo.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
