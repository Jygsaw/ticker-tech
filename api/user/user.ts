"use strict";

import * as express from "express";

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

// declare routes
router.route("/")
  .all((req, res, next) => {
    // set target id to self
    req.params.id = req.user.id || null;
    next();
  })
  .get(handleRead)
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
    password: "testpassC",
    first_name: "firstC",
    last_name: "lastC",
    address: "555 Anywhere #C",
    city: "Bakersfield",
    state: "CA",
    country: "USA",
    postal_code: "93311",
    phone: "5555555555",
    email: "bogus@example.com",
  };

  // validate data
  let validated: boolean = true;

  // create new record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => insertRecord("users", fields)) : null;
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
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

function handleUpdate(req, res, next) {
  // read incoming values
  let id: number = +req.params.id;
  let fields = {
    id: id,
    username: "testuserC",
    password: "testpassC",
    first_name: "firstC",
    last_name: "lastC",
    address: "555 Anywhere #C",
    city: "Bakersfield",
    state: "CA",
    country: "USA",
    postal_code: "93311",
    phone: "5555555555",
    email: "testuserC@example.com",
  }

  // validate data
  let validated: boolean = true;

  // update specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => updateById("users", id, fields)) : null;
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
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;
