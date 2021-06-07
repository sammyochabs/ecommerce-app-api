const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");

const app = express();

env.config();

mongoose
  .connect(process.env.mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
  });
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello from server" });
});

app.post("/data", (req, res, next) => {
  res.status(200).json({ message: req.body });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
