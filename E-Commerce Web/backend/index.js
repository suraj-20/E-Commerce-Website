require("dotenv").config();
const path = require("path");
const express = require("express");
const { connectMognoDb } = require("./config/mongodb");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const productRoute = require("./routes/product");
const userRoute = require("./routes/user.js");
const cartRoute = require("./routes/cart.js");
const { checkForAuthenticationCookie, fetchUser } = require("./middlewares/auth.js");

const app = express();
const PORT = process.env.PORT || 4000;
connectMognoDb(process.env.MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("uploads")));

app.get("/", (req, res) => {
  res.send("Hello Devloper");
});

app.use("/", productRoute);
app.use("/user", userRoute);
app.use("/cart", fetchUser, cartRoute);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve(`./uploads/images`));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
