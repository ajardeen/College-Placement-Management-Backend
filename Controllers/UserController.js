const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const { token } = require("../Configs/JwtToken");
const generateToken = token;
// account creation function
const userRegister = async (req, res) => {
  const formData = req.body;
  const { firstName, lastName, email, password, role = "Students" } = formData;
  try {
    if (firstName && lastName && email && password) {
      //Checking user already registered in DB
      const user = await User.findOne({ email });

      //if already registered
      if (user) {
        return res
          .status(200)
          .json({ message: "User already registered Please try login" });
      }
      //if not found in db proceed to create account
      const newUser = User({ firstName, lastName, email, password, role });
      await newUser.save();
      res
        .status(201)
        .json({ message: "Account Created Successfully", newUser });
    } else {
      res
        .status(406)
        .json({ message: "Please Provide all the Necessary Info to Proceed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//user login validation with DB and create JWT token
const userLogin = async (req, res) => {
  const formData = req.body;
  const { email, password } = formData;

  try {
    if (email && password) {
      //Checking user already registered in DB
      const user = await User.findOne({ email });
      //if user already registered
      if (!user) {
        res
          .status(404)
          .json({ message: "User not found register before login" });
      } else {
        //Validating password for found user
        const passwordValidation = await bcrypt.compare(
          password,
          user.password
        );
        if (passwordValidation) {
          const token = await generateToken(user);
          user.token = token;
          await user.save();
          res.status(200).json({
            message: "Login Successfully",
            token: token,
            userid: user._id,
            role: user.role,
            firstName: user.firstName ? user.firstName : false,
            lastName: user.lastName ? user.lastName : false,
            email: user.email,
          });
        } else {
          res
            .status(401)
            .json({ message: "unauthorized Check login Credential" });
        }
      }
    } else {
      res
        .status(406)
        .json({ message: "Please Provide all the Necessary Info to Proceed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  // userAccountUpdate,
  // userAccountDetails,
};
