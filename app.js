const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users-route");
const auth_routes = require("./routes/auth_routes");
const path = require("path");
const ejs = require("ejs");
const User = require("./model/users");

// storage
const { storage } = require("./storage/storage");
const multer = require("multer");
const upload = multer({ storage });

const app = express();
// Body parser configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// code goes here
app.post("/users/", upload.single("image"), async (req, res) => {
  // console.log("request file :", req.file.path);
  // const result = req.file.path;
  // res.status(200).send("Done : " + result);
  //res.send("Done : ", result);
  try {
    // Handle file upload
    console.log("request file:", req.file.path);
    const result = req.file.path;

    // Handle user registration
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return next(new HttpError("Please enter all the fields.", 422));
    }

    let user = new User({
      name,
      email,
      password,
      file: result, // Assuming you have a field in your user model for the profile image path
    });

    user = await user.save();

    if (!user) {
      return next(
        new HttpError("Adding user failed, please try again later.", 500)
      );
    }

    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Internal Server Error", 500));
  }
});

app.post(
  "/users/multiple/",
  upload.array("images", 10),
  async (req, res, next) => {
    try {
      // Handle file uploads
      const files = req.files;
      const filePaths = files.map((file) => file.path);

      // Handle user registration
      const { name, email, password } = req.body;

      let user = new User({
        name,
        email,
        password,
        files: filePaths, // Assuming you have a field in your user model for an array of profile image paths
      });

      user = await user.save();

      if (!user) {
        return next(
          new HttpError("Adding user failed, please try again later.", 500)
        );
      }

      return res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      // return next(new HttpError("Internal Server Error", 500));
      console.log("Internal Server Error");
    }
  }
);

app.use("/users", router);
app.use("/api", auth_routes);
mongoose
  .connect(
    "mongodb+srv://gauravkamble704:KEk2hZPd9I8Nr5Gd@cluster0.1xzpzd2.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
      console.log("Database is connected");
      console.log("http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
