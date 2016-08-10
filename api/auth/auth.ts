"use strict";

import * as express from "express";

import { AuthUser } from "classes-common/auth-user";

import {
  getByUsername
} from "../../shared/db/dummyDb";
import {
  dbCallWrapper,
  setReplyData
} from "../shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// declare routes
router.route("/")
  .post(handleAuth);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleAuth(req, res, next) {
  // read incoming values
  let username: string = req.body.username || null;
  let password: string = req.body.password || null;
  let user: AuthUser = dbCallWrapper(req, () => getByUsername("users", username));
  let loginSuccess: boolean = false;

  // validate data
  let validated: boolean = true;

  // authenticate credentials
  if (validated) {
    // verify user found
    if (user) {
      // verify password
      if (password === user.password) {
        loginSuccess = true;

        // init session vars
        req.session.userId = user.id;
      }
    }
  }

  // prep result
  if (loginSuccess) {
    setReplyData(req, "result", user.id);
  } else if (req.reply.status !== "error") {
    req.reply.status = "fail";
    req.reply.message = "invalid credentials";
  }

  // send response
  res.json(req.reply);
}

export default router;
