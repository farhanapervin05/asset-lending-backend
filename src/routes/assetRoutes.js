const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const assetController = require("../controllers/assetController");

// Admin only
router.post("/", auth, requireRole("admin"), assetController.createAssets);

// Any authenticated user
router.get("/", auth, assetController.getAssets);

module.exports = router;