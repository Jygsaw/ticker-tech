"use strict";

import * as express from "express";

import { Order } from "classes-common/order";

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
  // fetch all records of user
  let userId: number = +req.user.id;
  let result = dbCallWrapper(req, () => getAllByUserId("orders", userId));

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleCreate(req, res, next) {
  // validate incoming values
  let validated: boolean = false;
  let fields = {
    id: null,
    user_id: +req.user.id,
    listing_id: 1,
    quantity: 100,
    action: "buy",
    conditions: [ "market" ],
    status: "created",
  };

  // TODO remove debugging
  validated = true;

  // create new record
  let result = validated ? dbCallWrapper(req, () => insertRecord("orders", fields)) : null;

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
  let result = validated ? dbCallWrapper(req, () => getById("orders", id)) : null;

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
    user_id: +req.user.id,
    listing_id: 1,
    quantity: 100,
    action: "buy",
    conditions: [ "market" ],
    status: "created",
  };

  // TODO remove debugging
  validated = true;

  // update specified record
  let result = validated ? dbCallWrapper(req, () => updateById("orders", id, fields)) : null;

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
  let result = validated ? dbCallWrapper(req, () => deleteById("orders", id)) : null;

  // prep reply
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

export default router;
