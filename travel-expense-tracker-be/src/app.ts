import express, { Application } from "express";

import "./db";
import configureApp from "./config";
import handleErrors from "./error-handling";

import indexRoutes from "./routes/index.routes";
import expenseRoutes from "./routes/expense.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { isAuthenticated } from "./middleware/jwt.middleware";
import cors from "cors";

const app: Application = express();
app.use(cors());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
configureApp(app);
app.use(express.static("public"));

// Default value for title local
const projectName: string = "travel-expense-tracker";

app.locals.appTitle = projectName;

// 👇 Start handling routes here

app.use("/", indexRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
handleErrors(app);

export default app;
