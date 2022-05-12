const { default: axios } = require("axios");
const fs = require("fs");

const api = axios.create({
  baseURL: "http://127.0.0.1:9200/",
  headers: {
    "content-type": "application/json",
  },
});

let rawData = fs.readFileSync("medium_articles.json");
let data = JSON.parse(rawData);

data.forEach((artc) => {
  let article = artc;
  article.id = article._id;
  article._id = undefined;

  api
    .post("articles/_doc/", article)
    .then((data) => {
      console.log(`Article ${article.id} imported`);
    })
    .catch((err) => {
      console.log(`Article ${artc.id} couldnt import \r\n ${err}`);
    });
});

console.log("Finished");
