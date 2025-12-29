const router =  require("express").Router();
const auth = require("../middleware/authMiddleware");
const loanController = require("../controllers/loanController");

router.post("/borrow", auth, loanController.borrowAsset);
router.post("/return", auth, loanController.returnAsset);

module.exports = router;