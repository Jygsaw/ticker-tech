"use strict";

import * as express from "express";

import { StockPosition } from "../../shared/classes/stock-position";

// TODO remove debugging
import { dummyStockPositions } from "../../shared/utils/dummyDb";

let router: express.Router = express.Router();

router.route("/")
  .post((req, res) => {
    let userId: number = req.body.userId || null;
    let types: string[] = req.body.types || [];
    let result: {
      status: string;
      data?: {
        positions?: {
          stocks?: StockPosition[];
        };
      };
      message?: string;
    } = {
      "status": "success",
    };

    // fetch data for requested balance types
    types.forEach((type) => {
      try {
        let data = dummyStockPositions(userId);
        result.data = result.data || {};
        result.data.positions = result.data.positions || {};
        result.data.positions[type] = data;
      }
      catch (e) {
        console.error(e);
        result.status = "error"
        result.message = "Unable to communicate with database";
      }
    });

    // send response
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });

router.use((req, res) => res.sendStatus(200));

export default router;
