require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));


const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);

const storeOwnerRoutes = require("./routes/storeOwner");
app.use("/api/store", storeOwnerRoutes);


sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
});
