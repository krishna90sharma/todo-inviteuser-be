const express = require("express");
const bodyParser = require("body-parser");
const employee = require("./routes/employee.route");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/User", employee);

//app.use(express.static('./public'));

app.listen(3001, function() {
  console.log("server started on port 3001.");
});
