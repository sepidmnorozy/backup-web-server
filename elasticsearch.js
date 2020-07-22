var elasticsearch = require("elasticsearch");

var elasticClient = new elasticsearch.Client({
  host: "localhost:9200",
  log: "info"
});

// var indexName = "randomindex";
var indexName = "newsindex";
// var typeName = "document";
var typeName = "news";
/**
 * count an existing index
 */
async function countIndex() {
  elasticClient.count({ index: indexName, type: typeName }, function(
    err,
    resp,
    status
  ) {
    console.log("constituencies", resp);
  });
}
exports.countIndex = countIndex;

/**
 * Delete an existing index
 */
async function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
async function initIndex() {
  return elasticClient.indices.create({
    index: indexName
  });
}
exports.initIndex = initIndex;

/**
 * check if the index exists
 */
async function indexExists() {
  return elasticClient.indices.exists({
    index: indexName
  });
}
exports.indexExists = indexExists;

async function initMapping() {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: typeName,
    body: {
      properties: {
        title: { type: "string", analyzer: "english" },
        content: { type: "string" }
        // suggest: {
        //   type: "completion",
        //   analyzer: "simple",
        //   search_analyzer: "simple",
        //   payloads: true
        // }
      }
    }
  });
}
exports.initMapping = initMapping;

async function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: typeName,
    body: {
      title: document.title,
      content: document.content
      //   suggest: {
      //     input: document.title.split(" "),
      //     output: document.title,
      //     payload: document.metadata || {}
      //   }
    }
  });
}
exports.addDocument = addDocument;

async function getSuggestions(input) {
  console.log("get suggestions");
  console.log(input);

  try {
    result = await elasticClient.search({
      index: indexName,
      type: typeName,
      from: 0,
      size: 100,
      q: "preprocessed_text:" + input
      //   body: {
      //     query: {
      //       match: {
      //         title: {
      //           query: "Trial of the Clone"
      //         }
      //       }
      //     }
      //   }
    });
    return result;
  } catch (err) {
    console.log(err);
  }

  //   return elasticClient.search({
  //     index: indexName,
  //     type: "document",
  //     body: {
  //       query: {}
  //     }
  //   });
  //   return elasticClient.suggest({
  //     index: indexName,
  //     type: "document",
  //     body: {
  //       docsuggest: {
  //         text: input,
  //         completion: {
  //           field: "suggest",
  //           fuzzy: false
  //         }
  //       }
  //     }
  //   });
}
exports.getSuggestions = getSuggestions;

async function getPage(input) {
  console.log("get page");
  console.log(input);

  // await elasticClient
  //   .search({
  //     index: indexName,
  //     type: typeName,
  //     body: {
  //       query: {
  //         match_phrase: {
  //           url:
  //             "https\\:\\/\\/www.irinn.ir\\/fa\\/news\\/768790\\/تعطیلی\\-پایانه\\-مسافربری\\-غرب"
  //         }
  //       }
  //     }
  //   })
  //   .then(
  //     function(resp) {
  //       console.log("Successful query!");
  //       console.log(resp);
  //       return resp;
  //       // console.log(JSON.stringify(resp, null, 4));
  //     },
  //     function(err) {
  //       console.trace(err.message);
  //       return err.message;
  //     }
  //   );

  try {
    result = await elasticClient.search({
      index: indexName,
      type: typeName,
      body: {
        query: {
          match_phrase: {
            url: input
            // "https\\:\\/\\/www.irinn.ir\\/fa\\/news\\/768790\\/تعطیلی\\-پایانه\\-مسافربری\\-غرب"
          }
        }
      }
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}
exports.getPage = getPage;
