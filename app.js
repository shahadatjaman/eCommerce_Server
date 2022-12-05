const express = require("express");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const commonMiddleware = require("./middleware/Validator/common/commonMid");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport")(passport);

require("dotenv").config();

const PORT = 5000;

app.use("/auth", require("./routes/users/"));
app.use("/vendor", require("./routes/Vendor/product"));
app.use("/v2", require("./routes/Order/index"));
app.use(commonMiddleware);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("MongoDB Connected...");
  httpServer.listen({ port: process.env.PORT || PORT });
});
