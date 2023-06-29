require("dotenv").config();
let express = require("express");
let router = express.Router();

router.route("/:date").get((req, res, next) => {
  req.date = req.params.date;
  let regex = /^\d{4}\-\d{2}\-\d{2}(T\d{2}:\d{2})?$/;

  if (regex) {
    let UTC = new Date(req.date).toUTCString();
    let unix = new Date(req.date).valueOf();
    res.status(200).render("index", {
      data: {
        unix: unix,
        UTC: UTC,
        input: new Date(UTC).toLocaleString("fr"),
      },
    });
  } else {
    res.status(400).render("index", {
      data: {
        error: "Invalid Date",
        input: new Date(UTC).toLocaleString("fr"),
      },
    });
  }
  next();
});

module.exports = router;
