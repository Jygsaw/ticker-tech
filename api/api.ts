/// <reference path="./api.d.ts" />

"use strict";

import * as express from "express";

let router: express.Router = express.Router();

router.use("/account", require("./account/account").default);
router.use("/auth", require("./auth/auth").default);

router.use((req, res) => res.sendStatus(200));

export default router;
