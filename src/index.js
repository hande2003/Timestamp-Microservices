require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let date = require("./routes/date");

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use("/", date);

app.get("/", (req, res) => {
  res.render("index", {
    data: {
      unix: new Date().valueOf(),
      UTC: new Date().toUTCString(),
    },
  });
});

app.use("/public", express.static(process.cwd() + "/public"));

let PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Node is running on port ${PORT}. Go to http://localhost:${PORT}`)
);

module.exports = app;
