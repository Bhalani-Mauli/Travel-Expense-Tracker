import app from "./src/app";
import dotenv from "dotenv";

dotenv.config();
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
