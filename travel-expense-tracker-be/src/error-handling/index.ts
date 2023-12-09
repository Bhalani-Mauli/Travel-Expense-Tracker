import { Application, Request, Response, NextFunction } from "express";

export default (app: Application): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // this middleware runs whenever the requested page is not available
    res.status(404).send({ error: "something went wrong" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error occurred before sending the response
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  });
};
