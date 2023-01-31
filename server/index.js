import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import { AiRoute, postsRoute} from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.status(200).json("Hello world!");
});

app.use("/api/v1/post", postsRoute);
app.use("/api/v1/aiApi", AiRoute);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {}
};
startServer();
