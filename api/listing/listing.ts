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
  // validate incoming values
  let validated: boolean = false;
  let fields = {
    id: null,
    exchange: "NASDAQ",
    ticker: "GOOGL",
    name: "Alphabet Inc",
    type: "stock",
  };

  // TODO remove debugging
  validated = true;

  // create new record
  let result = validated ? dbCallWrapper(req, () => insertRecord("listing", fields)) : null;

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
  let result = validated ? dbCallWrapper(req, () => getById("listings", id)) : null;

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
    exchange: "NASDAQ",
    ticker: "GOOGL",
    name: "Alphabet Inc",
    type: "stock",
  };

  // TODO remove debugging
  validated = true;

  // update specified record
  let result = validated ? dbCallWrapper(req, () => updateById("listings", id, fields)) : null;

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
  let result = validated ? dbCallWrapper(req, () => deleteById("listings", id)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

export default router;
