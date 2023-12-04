import express, { Application } from "express";

import "./db";
import configureApp from "./config";
import handleErrors from "./error-handling";

import indexRoutes from "./routes/index.routes";
import expenseRoutes from "./routes/expense.routes";
import userRoutes from "./routes/user.routes";

const app: Application = express();

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

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
handleErrors(app);

export default app;
