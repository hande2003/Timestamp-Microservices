const { application } = require('express');
let express = require('express'); 
let router = express.Router();

router
    .route('/:date')
    .post((req, res, next)=>{
      req.date = req.params.date;
let regexLong = /^\d{2}\s\w{3,12}\s\d{4}\,\s\w{3}$/g;
let regexDate = /^\d{4}\-\d{2}\-\d{2}$/g;
let regexUnix = /^\d+$/g;

if(regexDate.test(req.date) | regexLong.test(req.date)){
    let UTC = new Date(req.date).toUTCString();
    let unix = new Date(req.date).valueOf();
    res.status(201).render('result', {data: {unix: unix, UTC: UTC}});
}
else if(regexUnix.test(req.date)){
    let unix = new Date(parseInt(req.date)).valueOf();
    let UTC = new Date(parseInt(req.date)).toUTCString();
    res.status(201).render('result', {data: {unix: unix, UTC: UTC}});
  }
else{
  res.status(400).render('error', {data:{error: "Invalid Date"}});
}
      next();
  })

module.exports = router;