const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  getAllJobs,
  getJobDetails,
  applyForJob,
  getStudentApplications,
  getAllDrives,
  registerForDrive,
  studentInterviewStatus,
} = require("../Controllers/StudentController");

router.post("/student-form-register", createStudent);
router.post("/get-all-jobs", getAllJobs);
router.post("/get-job-details", getJobDetails);
router.post("/apply", applyForJob);
router.get("/get-student-applications/:userid", getStudentApplications);
router.get("/drives", getAllDrives);
router.post("/register-for-drive", registerForDrive);
router.post("/student-interview-status", studentInterviewStatus);

module.exports = router;