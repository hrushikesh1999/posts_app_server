const MongoClient = require("mongodb").MongoClient;
const uri = "";
let _db;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(
      uri,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, client) => {
        _db = client.db("posts_app");
        return callback(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

const getDB = () => _db;

const disconnectDB = () => _db.close();

module.exports = { connectDB, getDB, disconnectDB };
