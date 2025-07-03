const {Router} = require("express");

const {roomController} = require("../controllers");
const {commonMiddleware} = require("../middlewares");

const router = Router();

router.get("/", roomController.findAll)
router.get("/:roomId", roomController.findById)
router.get("/:roomId/images", roomController.findRoomImages)
router.get("/images/all", roomController.findAllImages)
router.post(
    "/images/update",
    commonMiddleware.isPasswordValid("password"),
    roomController.updateImagesFromWubook
)

module.exports = router
