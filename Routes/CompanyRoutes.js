const express = require("express");
const router = express.Router();
const {
  createCompany,
  loginCompany,
  jobPosting,
  getAllJobsPostingByCompany,
  getStudentsDataById,
  scheduleInterview,
  getAllDrives,
  registerForDrive,
  scheduleZoomMeeting,
  getAllScheduleInterviewByCompany,
} = require("../Controllers/CompanyController");

router.post("/register", createCompany);
router.post("/login", loginCompany);
router.post("/job-posting/:companyId", jobPosting);
router.get("/get-all-jobs/:companyId", getAllJobsPostingByCompany);   
router.post("/getStudentsDataById", getStudentsDataById);
router.post("/schedule-interview", scheduleInterview);
router.get("/drives", getAllDrives);
router.post("/register-for-drive", registerForDrive);
router.post("/schedule-meeting", scheduleZoomMeeting);
router.get("/get-all-schedule-interview/:companyId", getAllScheduleInterviewByCompany);

module.exports = router;
