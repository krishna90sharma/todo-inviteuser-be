var admin = require("firebase-admin");

var serviceAccount = require("../nodejs-firabase-vue-firebase-adminsdk-7nr4t-29134b707f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-firabase-vue.firebaseio.com"
});

exports.db = admin.database();
// exports.db;
/**
 * Loading Firebase Database and refering
 * to user_data Object from the Database
 */
// var db = admin.database();
// let ref = db.ref("/userData"); //Set the current directory you are working in

/**
 * Setting Data Object Value
 */
// ref.set([
// {
//   id: 20,
//   name: "Jane Doe",
//   email: "jane@doe.com",
//   password: "123456"
// },
//   {
//     id: 21,
//     name: "John doe",
//     email: "john@doe.com",
//     website: "123456"
//   }
// ]);

// /**
//  * Pushing New Value
//  * in the Database Object
//  */
// ref.push({
//   id: 22,
//   name: "Jane Doe",
//   email: "jane@doe.com",
//   website: "123456"
// });

// /**
//  * Reading Value from
//  * Firebase Data Object
//  */
// ref.once("value", function(snapshot) {
//   var data = snapshot.val(); //Data is in JSON format.
//   console.log(data);
// });
