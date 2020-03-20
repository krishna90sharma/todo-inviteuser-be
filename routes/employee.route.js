const express = require("express");
const router = express.Router();

const employee_controller = require("../controllers/employee.controller");
const contacts_contoller = require("../controllers/contacts.controller");

router.post("/create", employee_controller.employee_create);

router.get("/detail", employee_controller.employee_detail);

router.post("/getUser", employee_controller.employee_get);

router.post("/login", employee_controller.login);

router.delete("/:id/delete", employee_controller.employee_delete);

router.patch("/:id/update", employee_controller.employee_update);

router.post("/createContact", contacts_contoller.create_contacts);

router.delete("/:id/deleteContact", contacts_contoller.delete_contacts);

router.get("/getContact", contacts_contoller.get_contacts);

router.patch("/:id/updateContact", contacts_contoller.update_contacts);
module.exports = router;
