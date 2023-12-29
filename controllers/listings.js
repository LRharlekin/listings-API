const getAllListings = async (req, res) => {
  res.send("get all listings");
};
const getListing = async (req, res) => {
  res.send("get listing");
};
const createListing = async (req, res) => {
  res.send("create a listing");
};
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
