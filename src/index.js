import * as dotenv from "dotenv";

dotenv.config();
import app from "./server.js";
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log("hii", PORT);
});
