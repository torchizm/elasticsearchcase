import express, { Express, Request, Response } from "express";
import api from "./api";
const bodyParser = require("body-parser");
const app: Express = express();
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/push", async (req: Request, res: Response) => {
  api.get("https://randomuser.me/api/").then((data) => {
    const user = data.data.results[0];

    api
      .post("sampledata/_doc/", user)
      .then((data) => {
        return res.json({ success: true });
      })
      .catch(() => {
        return res.json({ success: false });
      });
  });
});

type QueryParams = {
  query: string;
  searchField: string;
  order: string;
  orderType: string;
};

app.get(
  "/search",
  async (req: Request<null, null, null, QueryParams>, res: Response) => {
    if (req.query.query === "") {
      return api
        .get("sampledata/_search?size=50")
        .then((data) => {
          return res.json(data.data);
        })
        .catch((err) => console.dir(err, { depth: null }));
    }

    let query: any = {
      data: {
        query: {
          match: {},
        },
        sort: {},
      },
    };

    query.data.query.match[req.query.searchField] = {
      query: req.query.query,
      fuzziness: "2",
    };

    query.data.sort[req.query.order] = {
      order: req.query.orderType,
    };

    api
      .get("sampledata/_search?size=50", query)
      .then((data) => {
        return res.json(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server running at ${process.env.PORT || 5000}`)
);
