"use strict";

import * as express from "express";

import { AuthUser } from "classes-common/auth-user";
import { User } from "classes-common/user";

import {
  deleteById,
  getById,
  insertRecord,
  updateById
} from "../../shared/db/dummyDb";
import {
  adminAuth,
  dbCallWrapper,
  setReplyData
} from "../shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// delegate routes
router.use("/auth", require("./auth").default);

// declare routes
router.route("/")
  // TODO review API routing logic for unprotected "/user" routes
  .all((req, res, next) => {
    // set target id to self
    req.params.id = req.user ? req.user.id : null;
    next();
  })
  .get(handleRead)
  // TODO maybe move user creation to its own unprotected script in
  //      the same way as "/api/auth" and only keep protected reoutes
  //      behind "/user"
  .put(handleCreate)
  .post(handleUpdate)
  .delete(handleDelete);

router.route("/:id")
  .all(adminAuth)
  .get(handleRead)
  .put(handleUpdate)
  .post(handleUpdate)
  .delete(handleDelete);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleCreate(req, res, next) {
  // read incoming values
  let fields = {
    id: null,
    username: "testuserC",
    first_name: "firstC",
    last_name: "lastC",
    address: "555 Anywhere #C",
    city: "Bakersfield",
    state: "CA",
    country: "USA",
    postal_code: "93311",
    phone: "5555555555",
    email: "bogus@example.com",
    password: "testpassC",
    security_question: "questionC",
    security_answer: "answerC",
  };

  // validate data
  let validated: boolean = true;

  // create new record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => insertRecord("users", fields)) : null;
    result = stripSecurityData(result);
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

function handleRead(req, res, next) {
  // read incoming values
  let id: number = +req.params.id;

  // validate data
  let validated: boolean = true;

  // fetch specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => getById("users", id)) : null;
    result = stripSecurityData(result);
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
    result = stripSecurityData(result);
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

function handleDelete(req, res, next) {
  // read incoming values
  let id: number = +req.params.id;

  // validate data
  let validated: boolean = true;

  // delete specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => deleteById("users", id)) : null;
    result = stripSecurityData(result);
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;

/***** Helper Functions: begin *****/
// clone user record without security data
function stripSecurityData(user: AuthUser): User {
  let result = Object.assign({}, user);
  delete result.password;
  delete result.security_question;
  delete result.security_answer;
  return result;
}
