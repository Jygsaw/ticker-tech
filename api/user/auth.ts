"use strict";

import * as express from "express";

import { AuthUser } from "classes-common/auth-user";

import {
  getById,
  updateById
} from "../../shared/db/dummyDb";
import {
  dbCallWrapper,
  setReplyData
} from "../shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// declare routes
router.route("/")
  // TODO review API routing logic for unprotected "/user" routes
  .all((req, res, next) => {
    // set target id to self
    req.params.id = req.user ? req.user.id : null;
    next();
  })
  .get(handleRead)
  .post(handleUpdate);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleRead(req, res, next) {
  // read incoming values
  let id: number = +req.params.id;

  // validate data
  let validated: boolean = true;

  // fetch specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => getById("users", id)) : null;
    result = cloneAuthFields(result);
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

function handleUpdate(req, res, next) {
  // read incoming values
  let id: number = +req.params.id;
  let delta = req.body;

  // validate data
  let validated: boolean = true;
  // TODO implement server-side validation

  // update specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => updateById("users", id, delta)) : null;
    result = cloneAuthFields(result);
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;

/***** Helper Functions: begin *****/
function cloneAuthFields(user: AuthUser) {
  return {
    password: user.password,
    security_question: user.security_question,
    security_answer: user.security_answer,
  };
}
