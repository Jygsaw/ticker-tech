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
  // fetch all records of user
  let userId: number = +req.user.id;
  let result = dbCallWrapper(req, () => getAllByUserId("balances", userId));

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

export default router;
