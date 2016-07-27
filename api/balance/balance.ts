"use strict";

import * as express from "express";

import { Balance } from "classes-common/balance";

import {
  getAllByUserId,
} from "../../shared/db/dummyDb";
import {
  dbCallWrapper,
  setReplyData
} from "../shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// declare routes
router.route("/")
  .get(handleReadAll);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleReadAll(req, res, next) {
  // read incoming values
  let userId: number = +req.user.id;

  // fetch all records of user
  let result = dbCallWrapper(req, () => getAllByUserId("balances", userId));
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

export default router;
