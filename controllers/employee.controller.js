const user = require("../models/employee.model");
var ref = user.db.ref("/userData");

exports.employee_detail = function(req, res) {
  console.log("enter");
  ref.once(
    "value",
    function(snapshot) {
      var data = snapshot.val();
      console.log("snap", data);
      res.send(data);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
};

exports.login = function(req, res) {
  console.log(req.body);
  ref
    .orderByChild("email")
    .equalTo(req.body.email)
    .once(
      "value",
      function(snapshot) {
        var data = snapshot.val(); //Data is in JSON format.
        let pass;
        let user;
        console.log(data);
        for (key in data) {
          console.log("key", data[key]);
          pass = data[key].password;
          user = data[key];
        }
        if (pass == req.body.password) {
          res.json({
            status: "success",
            message: "Successfully Login!!!",
            data: user
          });
        } else {
          res.send("unable to login");
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("The read failed: " + errorObject.code);
      }
    );
};
exports.employee_create = function(req, res) {
  console.log("enter create", req.body);

  ref.push(req.body, function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.json({
        status: "success",
        message: "Successfully Registered!!!"
      });
    }
  });
};

exports.employee_delete = function(req, res) {
  console.log("enter delete", req.params.id);
  let userRef = user.db.ref("userData/" + req.params.id);
  userRef
    .remove()
    .then(function() {
      res.send({ status: "ok" });
    })
    .catch(function(error) {
      console.log("Error deleting data:", error);
      res.send({ status: "error", error: error });
    });
};

exports.employee_update = function(req, res) {
  console.log("enter update", req.body);
  console.log(req.params.id);
  let userRef = user.db.ref("userData/" + req.params.id);
  userRef
    .update(req.body)
    .then(function() {
      res.send({ status: "ok" });
    })
    .catch(function(error) {
      console.log("Error deleting data:", error);
      res.send({ status: "error", error: error });
    });
};

exports.employee_get = function(req, res) {
  console.log("email", req.body);
  ref
    .orderByChild("email")
    .equalTo(req.body.email)
    .once(
      "value",
      function(snapshot) {
        var data = snapshot.val(); //Data is in JSON format.
        let user;
        console.log("data", data);
        for (key in data) {
          console.log("key", data[key]);

          user = data[key];
          user.id = key;
        }

        res.json({
          status: "success",
          data: user
        });
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("The read failed: " + errorObject.code);
      }
    );
};
