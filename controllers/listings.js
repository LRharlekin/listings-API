const Listing = require("../models/Listing");
const asyncWrapper = require("../middlewares/async-wrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

// CRUD operation - CREATE
const createListing = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const listingToAdd = await Listing.create(req.body);
  res.status(StatusCodes.CREATED).json({ listingToAdd });
};

// CRUD operation - READ
const getAllListings = async (req, res) => {
  // We're actually not looking for "A.L.L." the jobs, but only those associated with the authorized user
  const listings = await Listing.find({ createdBy: req.user.userID }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ listings, count: listings.length });
};

// CRUD operation - READ
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

// CRUD operation - UPDATE
const updateListing = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: listingID },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company and Position fields cannot be empty.");
  }

  const listingToUpdate = await Listing.findOneAndUpdate(
    { _id: listingID, createdBy: userID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!listingToUpdate) {
    throw new NotFoundError(
      `Couldn't find listing with id: ${listingID}. Update has failed.`
    );
  }

  res.status(StatusCodes.OK).json({ listingToUpdate });
};

// CRUD operation - DELETE
const deleteListing = async (req, res) => {
  const {
    user: { userID },
    params: { id: listingID },
  } = req;

  const listingToDelete = await Listing.findOneAndDelete({
    _id: listingID,
    createdBy: userID,
  });

  if (!listingToDelete) {
    throw new NotFoundError(
      `Couldn't find listing with id: ${listingID}. No listing has been deleted.`
    );
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createListing,
  getAllListings,
  getListing,
  updateListing,
  deleteListing,
};
