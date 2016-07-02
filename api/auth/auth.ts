"use strict";

import * as express from "express";

import { User } from "../shared/classes/user";

// TODO remove debugging
import { dummyGetUser } from "../shared/utils/dummyDb";

interface dbUser extends User {
  password: string;
}

let router: express.Router = express.Router();

router.route("/")
  .post((req, res) => {
    let loginSuccess: boolean = false;
    let username: string = req.body.username || null;
    let password: string = req.body.password || null;
    let user: dbUser = dummyGetUser(username);
    let result: {
      status: string;
      data?: {
        password?: string;
        accessToken?: string;
        user?: User;
      };
      message?: string;
    } = {
      "status": "fail",
    };

    // verify user
    if (user) {
      // verify password
      if (password === user.password) {
        loginSuccess = true;
      }
    }

    // prep result
    if (loginSuccess) {
      delete user.password;
      result.status = "success";
      result.data = {
        "accessToken": "allyourbasearebelongtous",
        "user": user,
      };
    } else {
      result.status = "fail";
      result.data = {
        "password": "invalid credentials",
      };
    }

    // send response
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });

router.use((req, res) => res.sendStatus(200));

export default router;
