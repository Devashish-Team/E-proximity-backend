const express = require("express");
const router = express.Router();
const {
  getBranch,
  addBranch,
  deleteBranch,
  deactivateBranch,
  getBranchID
} = require("../../controllers/Other/branch.controller.js");
const {
  updateDetails,
} = require("../../controllers/Faculty/details.controller.js");

router.get("/getBranch", getBranch);
router.post("/getBranchID", getBranchID);
router.post("/addBranch", addBranch);
router.delete("/deleteBranch/:id", deleteBranch);
router.put("/deactivateBranch/:id", deactivateBranch);

module.exports = router;
