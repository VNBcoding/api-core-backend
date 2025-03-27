const express = require("express");
const router = express.Router();
const designationController = require("../controllers/designationController");
const { authenticateToken } = require("../middlewares/authenticationMiddleware");

router.post("/designationAdd", authenticateToken, designationController.addDesignation);
router.get("/getDesignations", authenticateToken, designationController.getAllDesignations);

module.exports = router;