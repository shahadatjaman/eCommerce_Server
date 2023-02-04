const express = require("express");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { mongoose } = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const commonMiddleware = require("./middleware/Validator/common/commonMid");

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://mern-ecommerce-23.vercel.app",
  ],
  methods: [" GET", "POST", " PUT", "PATCH", " DELETE"],
  credentials: true,

  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

require("dotenv").config({
  path: "./.env",
});

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport")(passport);

const PORT = 8000;

app.use("/admin", require("./routes/Admin"));
app.use("/auth", require("./routes/user"));
app.use("/v1", require("./routes/Product"));
app.use("/v2", require("./routes/Order/index"));
app.use("/v3", require("./routes/Product/getProducts"));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(commonMiddleware);

// default error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send("There was an upload error!");
    } else {
      return res.status(500).send(err.message);
    }
  } else {
    next();
  }
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("MongoDB Connected...");
  httpServer.listen({ port: process.env.PORT || PORT });
  httpServer.setTimeout = 10000;
});
