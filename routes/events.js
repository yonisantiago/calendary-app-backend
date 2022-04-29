/* 
    Event routes
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();

//All routes have to been validated using token
router.use(validateJWT);

//Get events
router.get("/", getEvents);

//Create new event
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

//Update event
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    check("id", "Id is not valid").isMongoId(),
    fieldValidator,
  ],
  updateEvent
);

//Delete event
router.delete("/:id", deleteEvent);

module.exports = router;
