"use strict";

import { Balance } from "classes-common/balance";
import { Listing } from "classes-common/listing";
import { Order } from "classes-common/order";
import { Position } from "classes-common/position";
import { User } from "classes-common/user";

let dummyDb: {
  balancesLastId: number,
  balances: { [key: number]: Balance };
  listingsLastId: number,
  listings: { [key: number]: Listing };
  ordersLastId: number,
  orders: { [key: number]: Order };
  positionsLastId: number,
  positions: { [key: number]: Position };
  usersLastId: number,
  users: { [key: number]: User };
} = {
  balancesLastId: null,
  balances: {},
  listingsLastId: null,
  listings: {},
  ordersLastId: null,
  orders: {},
  positionsLastId: null,
  positions: {},
  usersLastId: null,
  users: {}
};

dummyDb.balancesLastId = 2;
dummyDb.balances = {
  1: {
    id: 1,
    user_id: 1,
    value: 100000,
    type: "cash",
  },
  2: {
    id: 2,
    user_id: 2,
    value: 50000,
    type: "cash",
  },
};

dummyDb.listingsLastId = 2;
dummyDb.listings = {
  1: {
    id: 1,
    exchange: "NASDAQ",
    ticker: "EXDS",
    name: "Exodus Communications",
    type: "stock",
  },
  2: {
    id: 2,
    exchange: "NYSE",
    ticker: "RKUS",
    name: "Ruckus Wireless",
    type: "stock",
  },
};

dummyDb.ordersLastId = 2;
dummyDb.orders = {
  1: {
    id: 1,
    user_id: 1,
    quantity: 100,
    listing_id: 1,
    action: "buy",
    type: "market",
    price: null,
    status: "executed",
  },
  2: {
    id: 2,
    user_id: 1,
    quantity: 200,
    listing_id: 2,
    action: "buy",
    type: "market",
    price: null,
    status: "executed",
  },
};

dummyDb.positionsLastId = 2;
dummyDb.positions = {
  1: {
    id: 1,
    user_id: 1,
    quantity: 100,
    listing_id: 1,
  },
  2: {
    id: 2,
    user_id: 1,
    quantity: 200,
    listing_id: 2,
  },
};

dummyDb.usersLastId = 2;
dummyDb.users = {
  1: {
    id: 1,
    username: "testuserA",
    password: "testpassA",
    first_name: "firstA",
    last_name: "lastA",
    address: "555 Anywhere #A",
    city: "Bakersfield",
    state: "CA",
    country: "USA",
    postal_code: "93311",
    phone: "5555555555",
    email: "testuserA@example.com",
  },
  2: {
    id: 2,
    username: "testuserB",
    password: "testpassB",
    first_name: "firstB",
    last_name: "lastB",
    address: "555 Anywhere #B",
    city: "Bakersfield",
    state: "CA",
    country: "USA",
    postal_code: "93311",
    phone: "5555555555",
    email: "testuserB@example.com",
  },
};

export function deleteById(table: string, id: number) {
  delete dummyDb[table][id];
}

export function getAllByUserId(table: string, userId: number) {
  let targetTable = dummyDb[table];
  return Object.keys(targetTable)
    .filter((key) => targetTable[key].user_id === userId)
    .map((key) => targetTable[key]);
}

export function getById(table: string, id: number) {
  return dummyDb[table][id] || null;
}

export function getByUsername(table: string, username: string) {
  let targetTable = dummyDb[table];
  return Object.keys(targetTable)
    .filter((key) => targetTable[key].username === username)
    .map((key) => targetTable[key])
    [0];
}

export function insertRecord(table: string, delta: Listing|Order|Position|User) {
  delta.id = dummyDb[table + "LastId"] += 1;
  return dummyDb[table][delta.id] = delta;
}

export function updateById(table: string, id: number, delta: Listing|Order|Position|User) {
  return Object.assign(dummyDb[table][id], delta);
}
