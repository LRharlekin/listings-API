const Listing = require("../models/Listing");
const asyncWrapper = require("../middlewares/async-wrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllListings = async (req, res) => {
  // We're actually not looking for "A.L.L." the jobs, but only those associated with the authorized user
  const listings = await Listing.find({ createdBy: req.user.userID }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ listings, count: listings.length });
};
const getListing = async (req, res) => {
  // nested destructuring syntax!

  const {
    user: { userID },
    // give the destructured listing ID an appropriate alias
    params: { id: listingID },
  } = req;
  const listing = await Listing.findOne({
    createdBy: userID,
    _id: listingID,
  });
  if (!listing) {
    throw new NotFoundError(`Didn't find listing with id: ${listingID}`);
  }
  res.status(StatusCodes.OK).json({ listing });
};
const createListing = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const listingToAdd = await Listing.create(req.body);
  res.status(StatusCodes.CREATED).json({ listingToAdd });
};

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
