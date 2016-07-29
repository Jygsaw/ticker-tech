"use strict";

import * as express from "express";

import { Position } from "classes-common/position";

import {
  deleteById,
  getAllByUserId,
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
  .get(handleReadAll)
  .put(handleCreate);

router.route("/:id")
  .get(handleRead)
  .put(handleUpdate)
  .post(handleUpdate)
  .delete(handleDelete);

// fallback route
router.use((req, res, next) => next(new Error("invalid route")));

// route handlers
function handleReadAll(req, res, next) {
  // read incoming values
  let userId: number = +req.user.id;

  // fetch all records of user
  let result = dbCallWrapper(req, () => getAllByUserId("positions", userId));
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleCreate(req, res, next) {
  // read incoming values
  let fields = {
    id: null,
    user_id: +req.user.id,
    listing_id: 1,
    quantity: 300,
  };

  // validate data
  let validated: boolean = true;

  // create new record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => insertRecord("orders", fields)) : null;
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
    let result = validated ? dbCallWrapper(req, () => getById("positions", id)) : null;
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
    let result = validated ? dbCallWrapper(req, () => updateById("positions", id, delta)) : null;
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
    let result = validated ? dbCallWrapper(req, () => deleteById("positions", id)) : null;
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;
