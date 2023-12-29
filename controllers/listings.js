const getAllListings = async (req, res) => {
  res.send("get all listings");
};
const getListing = async (req, res) => {
  res.send("get listing");
};
const createListing = async (req, res) => {
  res.json(req.user);
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
