var express = require("express");
var router = express.Router();

var elastic = require("../elasticsearch");

router.use(async function(req, res, next) {
  console.log("you've called news api");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* GET suggestions */
router.get("/suggest/:input", async function(req, res) {
  console.log("search submitted get");
  var param = req.params;
  console.log(param["input"]);
  result = await elastic.getSuggestions(req.params.input);
  console.log("this is result");
  console.log(result);
  res.status(200);
  res.send(result);
});

router.post("/suggest", async function(req, res) {
  console.log("search submitted post");
  console.log(req.body.input);
  result = await elastic.getSuggestions(req.body.input);
  console.log("this is result");
  console.log(result);
  res.status(200);
  res.send(result);
});

router.post("/getSpecifiedPage", async function(req, res) {
  console.log("get page submitted post");
  console.log(req.body.input);
  result = await elastic.getPage(req.body.input);
  console.log("this is result");
  console.log(result);
  res.status(200);
  res.send(result);
});

/* POST document to be indexed */
router.post("/", async function(req, res, next) {
  elastic.addDocument(req.body).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
