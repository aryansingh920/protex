import * as fs from "fs";
import * as path from "path";


const queriesPath = path.join(process.cwd(), "database", "query");

const getEventsQuery = fs.readFileSync(
  path.join(queriesPath, "select", "getEvents.sql"),
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

export { getEventsQuery,AllEventsQuery,AllUsersQuery };
