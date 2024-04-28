const express = require("express");
const router = express.Router();
const { loginHandler, registerHandler, updateHandler, deleteHandler } = require("../../controllers/Admin/credential.controller.js");
const {changepasswordHandler} = require("../../controllers/changePassword.js");
router.post("/login", loginHandler);

router.post("/register", registerHandler);

router.put("/update/:id", updateHandler);

router.delete("/delete/:id", deleteHandler);

router.post("/chnagepassword/:id", changepasswordHandler);

module.exports = router;
