import express, { Express, Request, Response } from "express";
import { z } from "zod";

import {
  dbElement,
  dbPaginationQueryParser,
  getDbIndexParser,
  twoPositiveIntegerParser,
} from "./interface-example/db";

const app: Express = express();
const port = 3000;

const mockDB: Array<z.infer<typeof dbElement>> = [];
for (let i = 0; i < 10; i += 1) {
  mockDB[i] = { value: i, updatedAt: new Date() };
}

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

app.post("/db", (req, res) => {
  const { a, b } = twoPositiveIntegerParser.parse(req.body);

  const data = { value: a + b, updatedAt: new Date() };
  const index = mockDB.push(data) - 1;

  res.send(
    `value ${data.value} is append to the DB at time ${data.updatedAt} with index ${index}`
  );
});

app.get("/db/:index", (req, res) => {
  const dbIndexParser = getDbIndexParser(mockDB.length);
  const { index } = dbIndexParser.parse(req.params);

  const data = mockDB[index];

  res.send(`value ${data.value} is updated at ${data.updatedAt}`);
});

app.get("/db", (req, res) => {
  const { startDate, endDate, pageOffset, itemCount } =
    dbPaginationQueryParser.parse(req.query);

  const dateFilteredDB = mockDB.filter((e) => {
    if (startDate !== undefined && e.updatedAt < startDate) return false;
    if (endDate !== undefined && e.updatedAt > endDate) return  false;
    return true;
  })
  const startIndex = (pageOffset - 1) * itemCount;
  const result = dateFilteredDB.slice(startIndex, startIndex + itemCount);

  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
