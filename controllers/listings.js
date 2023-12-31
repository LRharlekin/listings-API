const Listing = require("../models/Listing");
const asyncWrapper = require("../middlewares/async-wrapper");
const { StatusCodes } = require("http-status-codes");

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
const updateListing = async (req, res) => {
  res.send("update or edit a listing");
};
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
