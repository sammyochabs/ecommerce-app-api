const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

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
  })
  .catch((err) => {
    console.log("database not connected ");
  });
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello from server" });
});

app.post("/data", (req, res, next) => {
  res.status(200).json({ message: req.body });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
