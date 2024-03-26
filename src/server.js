import express from "express";
import morgan from "morgan";
import { addUser, signIn } from "./db.js";
import { protect } from "./modules/auth.js";
import router from "./router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello" });
});

export default app;

app.use("/api", protect, router);
app.post("/createUser", addUser);
app.post("/signIn", signIn);
