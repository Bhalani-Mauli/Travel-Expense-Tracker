import express, { Application } from "express";
import logger from "morgan";
import path from "path";

// Middleware configuration
export default (app: Application): void => {
  // In development environment, the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));
};
