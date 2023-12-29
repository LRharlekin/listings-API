const express = require("express");
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");

const router = express.Router();

router.route("/").get(getAllListings).post(createListing);
router.route("/:id").get(getListing).patch(updateListing).delete(deleteListing);

module.exports = router;
