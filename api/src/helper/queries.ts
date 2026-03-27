import * as fs from "fs";
import * as path from "path";


const queriesPath = path.join(process.cwd(), "database", "query");

const getEventsQuery = fs.readFileSync(
  path.join(queriesPath, "select", "getEventsOnRegion.sql"),
  "utf-8",
);

const AllEventsQuery = fs.readFileSync(
  path.join(queriesPath, "select", "allEvents.sql"),
  "utf-8",
);

const AllUsersQuery = fs.readFileSync(
  path.join(queriesPath, "select", "allUsers.sql"),
  "utf-8",
);

const checkEventQuery = fs.readFileSync(
  path.join(queriesPath, "select", "checkEvent.sql"),
  "utf-8",
);

const checkUserQuery = fs.readFileSync(
  path.join(queriesPath, "select", "checkUser.sql"),
  "utf-8",
);

const loginUserQuery = fs.readFileSync(
  path.join(queriesPath, "select", "loginUser.sql"),
  "utf-8",
);

const getAllRegion = fs.readFileSync(
  path.join(queriesPath, "select", "getAllRegion.sql"),
  "utf-8",
);

export {
  getEventsQuery,
  AllEventsQuery,
  AllUsersQuery,
  checkEventQuery,
  checkUserQuery,
  loginUserQuery,
  getAllRegion
};
