require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");

app.use("/auth/", authRouter);
app.use("/books", apiRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Chioma's bookstore api",
    routes: {
      signup: "[post] /auth/signup",
      login: "[post] /auth/login",
      createBooks: "[post] /books",
      getBooks: "[get] /books",
      getABook: "[get] /books/:id",
      updateABook: "[patch] /books/:id",
      deleteABook: "[delete] /books/:id",
    },
  });
});

const PORT = process.env.PORT || 2005;
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
