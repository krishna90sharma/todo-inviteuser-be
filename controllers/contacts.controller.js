const user = require("../models/employee.model");
var ref = user.db.ref("/contacts");

exports.get_contacts = function(req, res) {
  console.log("enter");
  ref.once(
    "value",
    function(snapshot) {
      let arr = [];
      var data = snapshot.val(); //Data is in JSON format.
      for (key in data) {
        data[key].id = key;
        arr.push(data[key]);
      }
      console.log("arr", arr);
      res.send(arr);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
};

// exports.login = function(req, res) {
//   console.log(req.body);
//   ref
//     .orderByChild("email")
//     .equalTo(req.body.email)
//     .once(
//       "value",
//       function(snapshot) {
//         var data = snapshot.val(); //Data is in JSON format.
//         let pass;
//         console.log(data);
//         for (key in data) {
//           console.log("key", data[key]);
//           pass = data[key].password;
//         }
//         if (pass == req.body.password) {
//           res.send("Successfully Login");
//         } else {
//           res.send("unable to login");
//         }
//       },
//       function(errorObject) {
//         console.log("The read failed: " + errorObject.code);
//         res.send("The read failed: " + errorObject.code);
//       }
//     );
// };
exports.create_contacts = function(req, res) {
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

exports.delete_contacts = function(req, res) {
  console.log("enter delete", req.params.id);
  let userRef = user.db.ref("contacts/" + req.params.id);
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

exports.update_contacts = function(req, res) {
  console.log("enter update", user.db);
  console.log(req.params.id);
  let userRef = user.db.ref("contacts/" + req.params.id);
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
