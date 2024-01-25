const User = require("../model/users");
const cloudinary = require("cloudinary").v2;
// const storage = require("../storage/storage");
const multer = require("multer");
// const upload = multer({ storage });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  return res.status(200).json({ users });
};

// const addUser = async (req, res) => {
//   //   const { name, email, password } = req.body;
//   //   const result = upload.single("image");
//   //   console.log("result", result);
//   //   console.log("result", req.file);

//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(
//       req.file.buffer.toString("base64")
//     );

//     console.log("result : ", result);

//     // Create a new post in MongoDB
//     let users = new User({
//       name: req.body.text,
//       email: req.body.email,
//       password: req.body.password,
//       file: result.secure_url,
//     });

//     await users.save();

//     res.status(201).json({ message: "Post created successfully", post: users });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
//   //   if (
//   //     !name &&
//   //     name.trim() === "" &&
//   //     !email &&
//   //     email.trim() === "" &&
//   //     !password &&
//   //     password.lenght < 6
//   //   ) {
//   //     return next(new HttpError("Please enter all the fields.", 422));
//   //   }

//   //   let user;
//   //   try {
//   //     user = new User({
//   //       name,
//   //       email,
//   //       password,
//   //     });
//   //     user = await user.save();
//   //   } catch (err) {
//   //     console.log(err);
//   //   }

//   //   if (!user) {
//   //     return next(
//   //       new HttpError("Adding user failed, please try again later.", 500)
//   //     );
//   //   }
//   //   return res.status(201).json({ user });
// };

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.lenght < 6
  ) {
    return next(new HttpError("Please enter all the fields.", 422));
  }

  let user;

  try {
    user = await User.findByIdAndUpdate(userId, {
      name,
      email,
      password,
    });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update user.", 500)
    );
  }

  if (!user) {
    return next(
      new HttpError("Adding user failed, please try again later.", 500)
    );
  }

  return res.status(200).json({ message: "user update sucessfully" });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  let user;

  try {
    user = await User.findByIdAndDelete(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }

  if (!user) {
    console.log("user not found");
  }

  return res.status(200).json({ message: "user delete sucessfully" });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find user.", 500)
    );
  }

  if (!user) {
    console.log("user not found");
  }

  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
// exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
