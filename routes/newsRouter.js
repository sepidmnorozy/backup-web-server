const express = require("express");
const news = require("../models/news.js");
const w2vcluster = require("../models/w2vcluster.js");
const tfidfcluster = require("../models/tfidfcluster.js");
const searchresults = require("../models/searchresults.js");
// var arraySort = require("array-sort");
var ps = require("python-shell");

// async function findlaststatus() {
//   let result = await searchstatus.model.find({}).exec();
//   // console.log("status db len");
//   // console.log(result.length);
//   var status = result[result.length - 1]["status"];
//   console.log("status is");
//   console.log(status);
//   return status;
// }
const newsRouter = express.Router();
newsRouter
  .use(async function(req, res, next) {
    console.log("you've called news api");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .get("/", async function(req, res) {
    news.model.find({}, (error, newsfounded) => {
      if (error) {
        console.log("ey khoda");
        res.send(error);
      }
      console.log("hale");
      console.log(newsfounded.length);
      arraySort(newsfounded, "timestamp", { reverse: true });
      res.status(200);
      res.send(newsfounded.length);
    });
  })
  // .get("/similars", async function(req, res) {
  //   similar.model.find({}, (error, similarsfounded) => {
  //     if (error) {
  //       console.log("ey khoda");
  //       res.send(error);
  //     }
  //     console.log("similars");
  //     console.log(similarsfounded.length);
  //     //   arraySort(newsfounded, "timestamp", { reverse: true });
  //     res.status(200);
  //     res.send(similarsfounded);
  //   });
  // })
  .get("/test", async function(req, res) {
    console.log("this is a test end point");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200);
    res.send("haha i could get data from server");
  })
  .get("/w2vclusters", async function(req, res) {
    console.log("get w2v clusters");
    try {
      //listing messages in users mailbox 
      let wresult = await w2vcluster.model.find({}).sort({numofnews:-1}).exec();
      var finalres = [];
      finalres.push(wresult);
      console.log(finalres[0].length);
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.status(200);
      res.send(finalres);

    } catch (err) {
      console.log('That did not go well.')
      throw error
    }
  })
  .get("/tfidfclusters", async function(req, res) {
    try{
      console.log("get tfidf clusters");
      let tresult = await tfidfcluster.model.find({}).sort({numofnews:-1}).exec();
      var finalres = [];
      finalres.push(tresult);
      console.log(finalres[0].length);
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.status(200);
      res.send(finalres);
    } catch (err){
      console.log('That did not go well.')
      throw error
    }
  })
  .post("/search", async function(req, res) {
    console.log("search submitted");
    console.log(req.body.text);
    var options = {
      args: [
        req.body.text // search text
      ]
    };
    ps.PythonShell.run(
      "/home/momtazi/Projects/news_tracker/crawler/search.py",
      options,
      function(err, data) {
        if (err) {
          console.log("error");
          console.log(err);
          res.send(err);
        }
        console.log("jigari");
        console.log(data);
        if (data == "ok") {
          searchresults.model.find({}, (error, newsfounded) => {
            if (error) {
              console.log("ey khoda");
              console.log(error);
              res.send(error);
            }
            res.status(200);
            res.send(newsfounded);
          });
        }
      }
    );
    // var spawn = require("child_process").spawn;
    // var process = spawn("python", [
    //   "/home/mnoroozi/PycharmProjects/crawler/search.py",
    //   req.body.text // search text
    // ]);
    // process.stdout.on("data", function(data) {
    //   res.status(200);
    //   res.json({
    //     search_results: data
    //   });
    // });
  });
module.exports = newsRouter;
