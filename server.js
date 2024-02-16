const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/getDay", (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Date parameter is required." });
  }

  const day = getDayFromDate(date);
  console.log("day", day);
  if (!day) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use DDMMYYYY." });
  }

  res.json({ day });
});
function getDayFromDate(dateString) {
  const dateRegex = /^(\d{2})(\d{2})(\d{4})$/;
  const match = dateString.match(dateRegex);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // Month is 0-indexed in JavaScript Date object
  const year = parseInt(match[3], 10);

  const dateObj = new Date(year, month, day);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dateObj.getDay()];
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
