const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const signinRoute = require("./routes/signin");
const passwordRoute = require("./routes/password");
const registerRoute = require("./routes/register");
const codeRoute = require('./routes/code');
const profileRoutes = require("./routes/profile");
const commentRoutes = require("./routes/comments");

app.use("/auth", signinRoute);
app.use("/auth", passwordRoute);
app.use("/auth", registerRoute);
app.use('/auth', codeRoute);
app.use("/auth", profileRoutes);
app.use("/comments", commentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
