/// <reference path="./api.d.ts" />

"use strict";

import * as express from "express";

import { User } from "classes-common/user";

import { getById } from "../shared/db/dummyDb";
import { dbCallWrapper } from "./shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// authorization middleware
router.use((req, res, next) => {
  // initialize api state
  req.reply = { status: "success" };

  // validate incoming values
  let userId: number = null;
  let credentials: string = null;

  // TODO remove debugging
  userId = 1;

  // verify credentials
  let user: User = null;
  let authenticated: boolean = false;
  let authorized: boolean = false;

  // TODO remove debugging
  user = dbCallWrapper(req, () => getById("users", userId));
  authenticated = true;
  authorized = true;

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
router.use("/auth", require("./auth/auth").default);
router.use("/balance", require("./balance/balance").default);
router.use("/listing", require("./listing/listing").default);
router.use("/order", require("./order/order").default);
router.use("/position", require("./position/position").default);
router.use("/user", require("./user/user").default);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

export default router;
