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
  dbCallWrapper,
  setReplyData
} from "../shared/utils/utils";

// initialize router
let router: express.Router = express.Router();

// declare routes
router.route("/")
  .put(handleCreate);

router.route("/:id")
  .get(handleRead)
  .put(handleUpdate)
  .post(handleUpdate)
  .delete(handleDelete);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleCreate(req, res, next) {
  // validate incoming values
  let validated: boolean = false;
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

  // TODO remove debugging
  validated = true;

  // create new record
  let result = validated ? dbCallWrapper(req, () => insertRecord("users", fields)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleRead(req, res, next) {
  // validate incoming values
  let validated: boolean = false;
  let id: number = +req.params.id;

  // TODO remove debugging
  validated = true;

  // fetch specified record
  let result = validated ? dbCallWrapper(req, () => getById("users", id)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleUpdate(req, res, next) {
  // validate incoming values
  let validated: boolean = false;
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

  // TODO remove debugging
  validated = true;

  // update specified record
  let result = validated ? dbCallWrapper(req, () => updateById("users", id, fields)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleDelete(req, res, next) {
  // validate incoming values
  let validated: boolean = false;
  let id: number = +req.params.id;

  // TODO remove debugging
  validated = true;

  // delete specified record
  let result = validated ? dbCallWrapper(req, () => deleteById("users", id)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

export default router;
