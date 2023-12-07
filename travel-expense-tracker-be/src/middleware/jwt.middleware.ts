import { Request } from "express";
import { expressjwt as expressJwt } from "express-jwt";

interface AuthenticatedRequest extends Request {
  payload?: any;
}

const isAuthenticated = expressJwt({
  secret: process.env.TOKEN_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders as (
    req: Request
  ) => string | Promise<string> | undefined,
});

function getTokenFromHeaders(req: Request): string | null {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

export { isAuthenticated };
