const NewUser = require("../model/new_user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login_post = async (req, res) => {
  const { email, password } = req.body;

  // check if email exists in DB!
  const dbUser = await NewUser.findOne({ email: email }).exec();
  console.log("dbUser", dbUser);
  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email },
        "secret",
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
    }
  } else {
    res.status(400).json({ message: "Username or Password incorrect" });
  }
};

exports.login_post = login_post;
