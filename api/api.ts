/// <reference path="./api.d.ts" />

"use strict";

import * as express from "express";

import { User } from "classes-common/user";

import { getById } from "../shared/db/dummyDb";
import { dbCallWrapper } from "./shared/utils/utils";

// initialize router
let router: express.Router = express.Router();
router.use((req, res, next) => {
  // initialize api state
  req.reply = { status: "success" };
  next();
});

// delegate open routes
router.use("/auth", require("./auth/auth").default);
router.use("/register", require("./user/user").default);

// authorization middleware
router.use((req, res, next) => {
  // initialize variables
  let userId: number = +req.session.userId;
  let user: User = null;
  let authenticated: boolean = false;
  let authorized: boolean = false;

  // verify authentication
  // TODO research and handle invalid session scenarios
  let validSession: boolean = true;
  if (validSession) {
    authenticated = true;

    // verify authorization
    user = dbCallWrapper(req, () => getById("users", userId));
    // TODO implement permissions?
    let userPermissions: boolean = true;
    if (userPermissions) {
      authorized = true;
    }
  }

  // reject request or initialize user
  if (!authenticated) {
    req.reply = { status: "error", message: "invalid authentication" };
    res.status(401).json(req.reply);
  } else if (!authorized) {
    req.reply = { status: "error", message: "insufficient authorization" };
    res.status(403).json(req.reply);
  } else {
    // note: may conflict with ExpressJS
    // TODO research ExpressJS "user" and "authenticatedUser"
    req.user = user;
    next();
  }
});

// delegate routes
router.use("/account", require("./account/account").default);
router.use("/balance", require("./balance/balance").default);
router.use("/listing", require("./listing/listing").default);
router.use("/order", require("./order/order").default);
router.use("/position", require("./position/position").default);
router.use("/user", require("./user/user").default);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

export default router;
