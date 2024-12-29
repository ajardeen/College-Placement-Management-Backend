const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectMongoDB = require("./Configs/ConfigDB");
const UserRoute = require("./Routes/UserRoute");
const cors = require("cors");
const DefaultRoute = require("./Routes/DefaultRoute");
const StudentRoutes = require("./Routes/StudentRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use('/',DefaultRoute)
app.use("/api/auth", UserRoute);
app.use("/api/auth/student",StudentRoutes)
app.use("/api/auth/company",CompanyRoutes);
app.use("/api/auth/admin",AdminRoutes);
app.listen(port, (error) => {
  if (error) {
    console.log(error.message, "Server Failed to Start");
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

connectMongoDB();
