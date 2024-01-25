const NewUser = require("../model/new_user");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const saltRounds = 10;
// saltRounds is the number of times the password is hashed to make it more secure and difficult to crack by brute force attacks

const validateSignupData = async (req, res) => {
  const { name, email, password } = req.body;

  if (name.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Name" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please Enter password" });
    return false;
  } else if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length is 6 characters" });
    return false;
  }

  // check if email exists in DB!
  const existingUser = await NewUser.findOne({ email: email }).exec();
  if (existingUser) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  return true;
};

const signup_post = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  // Validate Inputs
  const isValid = await validateSignupData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await NewUser.create({
        name,
        email,
        password: hashedPassword,
        confirmPassword,
      });

      return res.json({
        message: "Account Created Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.confirmPassword,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  }
};

exports.signup_post = signup_post;
