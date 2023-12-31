const Listing = require("../models/Listing");
const asyncWrapper = require("../middlewares/async-wrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllListings = async (req, res) => {
  res.send("get all listings");
};
const getListing = async (req, res) => {
  res.send("get listing");
};
const createListing = asyncWrapper(async (req, res) => {
  const listingToAdd = await Listing.create(req.body);
  res.status(StatusCodes.CREATED).json({ listingToAdd });
});
const updateListing = asyncWrapper(async (req, res) => {
  const { id: listingID } = req.params;
  const listing = await Listing.findByIdAndUpdate(listingID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!listing) {
    throw new NotFoundError(`No listing with id: ${listingID} found.`);
  }
  res.status(StatusCodes.OK).json({ listing });
});

const deleteListing = async (req, res) => {
  res.send("delete listing");
};

module.exports = {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
};
