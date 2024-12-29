const mongoose = require("mongoose");

const PlacementDriveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participatingCompanies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    ],
    statistics: {
      totalParticipants: { type: Number, default: 0 },
      interviewsConducted: { type: Number, default: 0 },
      offersMade: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementDrive", PlacementDriveSchema);
