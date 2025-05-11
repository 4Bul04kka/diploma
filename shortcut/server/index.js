import express from "express";

const PORT = 3001;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("works");
});
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

// https://www.youtube.com/watch?v=tKM44vPHU0U
