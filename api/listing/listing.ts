"use strict";

import * as express from "express";

import { Listing } from "classes-common/listing";

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
  // read incoming values
  let fields = {
    id: null,
    exchange: "NASDAQ",
    ticker: "GOOGL",
    name: "Alphabet Inc",
    type: "stock",
  };

  // validate data
  let validated: boolean = true;

  // create new record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => insertRecord("listing", fields)) : null;
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
    let result = validated ? dbCallWrapper(req, () => getById("listings", id)) : null;
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
    exchange: "NASDAQ",
    ticker: "GOOGL",
    name: "Alphabet Inc",
    type: "stock",
  };

  // validate data
  let validated: boolean = true;

  // update specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => updateById("listings", id, fields)) : null;
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
    let result = validated ? dbCallWrapper(req, () => deleteById("listings", id)) : null;
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;
