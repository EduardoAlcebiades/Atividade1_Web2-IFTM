import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Server started successful in http://localhost:${port}`);
});
