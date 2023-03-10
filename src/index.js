require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let date = require("./router/date");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json()); 

app.post('/api', (req, res)=>{
  res.json({unix: new Date().valueOf(), utc: new Date().toUTCString()});
});

app.use('/api', date);

app.get('/', (req, res)=>{res.sendFile(process.cwd() + "/views/index.html")});

app.use('/public', express.static(process.cwd() + "/public"));

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => (console.log(`Node is listening on port ${PORT}...`)));