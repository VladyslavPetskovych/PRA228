const {Router} = require("express");

const {roomController} = require("../controllers");
const {commonMiddleware} = require("../middlewares");

const router = Router();

router.get("/", roomController.findAll)
router.get("/:roomId", roomController.findById)
router.post(
    "/images/update",
    commonMiddleware.isPasswordValid("password"),
    roomController.updateImagesFromWubook
)

module.exports = router
