const PlacementDrive = require("../Models/PlacementDriveModel");
const Company = require("../Models/CompanyModel");
const Student = require("../Models/StudentModel");
const Participation = require("../Models/ParticipationModel");
const AcedemicRecord = require("../Models/AcademicRecordModel");
const Interview = require("../Models/InterviewModel");

// Create a new placement drive
const createPlacementDrive = async (req, res) => {
  try {
    const formData = req.body;
    const { title, description, startDate, endDate } = formData;
    const placementDrive = new PlacementDrive({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    await placementDrive.save();
    res.status(201).json({ message: "Placement drive created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create placement drive" });
  }
};

// get all placement drives
const getAllPlacementDrives = async (req, res) => {
  try {
    const placementDrives = await PlacementDrive.find();
    res.status(200).json(placementDrives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch placement drives" });
  }
};

// get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select(
      "companyName email phone contactPerson industry location"
    );
    const companyData = companies.map((company) => ({
      companyName: company.companyName,
      email: company.email,
      phone: company.phone,
      contactPerson: company.contactPerson,
      industry: company.industry,
      location: company.location,
    }));
  
    res.status(200).json(companyData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// add Acedemic records
const addAcademicRecords = async (req, res) => {
  try {
    const formData = req.body;
    const {
      studentId,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
    } = formData;
    // i changed the studentId to studentRegistrationNumber
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const existingAcademicRecord = await AcedemicRecord.findOne({ email });
    if (existingAcademicRecord) {
      return res
        .status(400)
        .json({ error: "Academic records already exist for this student" });
    }
    const studentRegistrationNumber = studentId;
    const academicRecord = new AcedemicRecord({
      studentRegistrationNumber,
      studentId: student._id,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
    });

    await academicRecord.save();
    student.academicRecords = academicRecord._id;
    await student.save();

    res.status(200).json({ message: "Academic records added successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to add academic records" });
  }
};

// get all students Academic Records
const getAllAcademicRecords = async (req, res) => {
  try {
    const academicRecords = await AcedemicRecord.find();
    res.status(200).json(academicRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch academic records" });
  }
};

// update student Academic Records
const updateAcademicRecords = async (req, res) => {
  try {
    const formData = req.body;
    const {
      studentRegistrationNumber,
      email,
      department,
      batch,
      GPA,
      grades,
      achievements,
      transcript,
      _id,
    } = formData;
   

    const academicRecord = await AcedemicRecord.findById(_id);
    if (!academicRecord) {
      return res.status(404).json({ error: "Academic record not found" });
    }
    await AcedemicRecord.findByIdAndUpdate(
      _id,
      {
        studentRegistrationNumber,
        department,
        batch,
        GPA,
        grades,
        achievements,
        transcript,
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to update academic records" });
  }
};

//get all interviews

const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error){
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
}




// update student interview status
const updateInterviewStatus = async (req, res) => {
  try {
    const { applicationId, scheduledDate, format, link, status, feedback } = req.body;
  
   
    const interview = await Interview.findOne({ applicationId });
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    interview.scheduledDate = new Date(scheduledDate);
    interview.format = format;
    interview.link = link;
    interview.status = status;
    interview.feedback = feedback;
    await interview.save();
    res.status(200).json({ message: "Interview status updated successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to update interview status" });
  }
};


module.exports = {
  createPlacementDrive,
  getAllPlacementDrives,
  getAllCompanies,
  addAcademicRecords,
  getAllAcademicRecords,
  updateAcademicRecords,
  getAllInterviews,
  updateInterviewStatus,  
};
