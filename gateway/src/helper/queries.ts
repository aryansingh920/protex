import * as fs from "fs";
import * as path from "path";


const getEventsQuery = fs.readFileSync(
  path.join(__dirname, "../../database/queries/getEvents.sql"),
  "utf-8",
);


export { getEventsQuery };
