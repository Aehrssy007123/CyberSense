const express = require("express");
const cors = require("cors");

const questionsRoute = require("./routes/questions");
const scenariosRoute = require("./routes/scenarios");
const topicsRoute = require("./routes/topics");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CyberSense Backend Running");
});

app.use("/api/questions", questionsRoute);
app.use("/api/scenarios", scenariosRoute);
app.use("/api/topics", topicsRoute);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
