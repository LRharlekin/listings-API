const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, "Please provide company name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declinded", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt properties with timestamps to instances of this model
);

module.exports = mongoose.model("Listing", ListingSchema);
