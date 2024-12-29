const express = require("express");
const router = express.Router();
const {
  createPlacementDrive,
  getAllPlacementDrives,
  getAllCompanies,
  addAcademicRecords,
  getAllAcademicRecords,
  updateAcademicRecords,
  getAllInterviews,
  updateInterviewStatus,
} = require("../Controllers/AdminController");


router.post("/create-placement-drive", createPlacementDrive);
router.get("/get-all-placement-drives", getAllPlacementDrives);
router.get("/get-all-companies", getAllCompanies);
router.post("/add-academic-records", addAcademicRecords);
router.get("/get-all-academic-records", getAllAcademicRecords);
router.put("/update-academic-records", updateAcademicRecords);
router.get("/get-all-interviews", getAllInterviews);
router.put("/update-interview-status", updateInterviewStatus);

module.exports = router;