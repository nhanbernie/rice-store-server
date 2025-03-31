import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running at port: 3001");
});
app.listen(3001, () => {
  console.log("Server is running on port 3000");
});

// export default app;
