"use strict";

import * as express from "express";

import { Order } from "classes-common/order";
import { ValidationError } from "classes-common/validation-error";

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
  let result = dbCallWrapper(req, () => getAllByUserId("orders", userId));
  setReplyData(req, "result", result);

  // send reply
  res.json(req.reply);
}

function handleCreate(req, res, next) {
  // read incoming values
  let fields = {
    id: null,
    user_id: +req.user.id,
    listing_id: req.body.listing_id || null,
    quantity: req.body.quantity || null,
    action: req.body.action || null,
    type: req.body.type || null,
    price: req.body.price || null,
    status: "created",
  };

  // validate data
  let validated: boolean = true;
  let errors: ValidationError = {};
  Object.keys(fields).forEach(key => {
    // TODO refactor into something more readable
    if (((key !== "id" && key !== "price")
         || (key === "price" && fields["type"] === "limit"))
        && fields[key] === null) {
      errors[key] = "invalid value";
      validated = false;
    }
  });
  if (!validated) {
    req.reply.status = "fail";
    req.reply.errors = errors;
  }

  // create new record
  if (validated) {
    let result = dbCallWrapper(req, () => insertRecord("orders", fields));
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
    let result = validated ? dbCallWrapper(req, () => getById("orders", id)) : null;
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
    user_id: +req.user.id,
    listing_id: 1,
    quantity: 100,
    action: "buy",
    type: "market",
    price: null,
    status: "created",
  };

  // validate data
  let validated: boolean = true;

  // update specified record
  if (validated) {
    let result = validated ? dbCallWrapper(req, () => updateById("orders", id, fields)) : null;
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
    let result = validated ? dbCallWrapper(req, () => deleteById("orders", id)) : null;
    setReplyData(req, "result", result);
  }

  // send reply
  res.json(req.reply);
}

export default router;
