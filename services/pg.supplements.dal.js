// SETTING UP LOGGER
const logEvents = require("../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

const dal = require("./auth_db");

var getSupplements = function () {
  if (DEBUG) console.log("supplements.pg.dal.getSupplements()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT id AS id, name,use FROM supplement1";

    dal.query(sql, [], (err, result) => {
      if (err) {
        myEmitter.emit(
          "log",
          "getSupplements())",
          "ERROR",
          "getSupplements() function has failed"
        );
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "getSupplements())",
          "INFO",
          "Supplements List Has Been Accessed  "
        );
        resolve(result.rows);
      }
    });
  });
};

var getSupplementBySupplementId = function (id) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT id AS id, name, use FROM supplement1 WHERE id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "getSupplementBySupplementId())",
          "ERROR",
          "getSupplementBySupplementId() function has failed  "
        );

        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "getSupplementBySupplementID())",
          "INFO",
          "A Specific Supplement Has Been Accessed"
        );
        resolve(result.rows);
      }
    });
  });
};

var addSupplement = function (id, name, use) {
  if (DEBUG) console.log("supplements.pg.dal.addSupplement()");
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO supplement1 (id, name, use) VALUES ($1, $2, $3);";
    dal.query(sql, [id, name, use], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "addSupplement())",
          "ERROR",
          "addSupplement function has failed  "
        );
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "addSupplement())",
          "INFO",
          "A Supplement Has Been Added To The List  "
        );
        resolve(result.rows);
      }
    });
  });
};

var deleteSupplement = function (id) {
  if (DEBUG) console.log("supplement.pg.dal.deleteSupplement()");
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM supplement1 WHERE id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "deleteSupplement())",
          "ERROR",
          "deleteSupplement function has failed  "
        );

        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "deleteSupplement())",
          "WARN",
          "a Supplement Has Been Deleted From The List "
        );
        resolve(result.rows);
      }
    });
  });
};

var putSupplement = function (id, name, use) {
  if (DEBUG) console.log("supplements.pg.dal.putSupplement()");
  return new Promise(function (resolve, reject) {
    const sql = "UPDATE supplement1 SET name=$2, use=$3 WHERE id=$1;";
    dal.query(sql, [id, name, use], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "putSupplement())",
          "ERROR",
          "Put function has failed  "
        );
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "putSupplement())",
          "INFO",
          "Supplement Info Has Been Updated  "
        );
        resolve(result.rows);
      }
    });
  });
};

var patchSupplement = function (id, name, use) {
  if (DEBUG) console.log("supplements.pg.dal.patchSupplement()");
  return new Promise(function (resolve, reject) {
    const sql = "UPDATE supplement1 SET name=$2, use=$3 WHERE id=$1;";
    dal.query(sql, [id, name, use], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "patchSupplement())",
          "ERROR",
          "patchSupplement function has failed  "
        );
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "patchSupplement())",
          "Info",
          "Supplement Info Has Been Updated  "
        );
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getSupplements,
  addSupplement,
  getSupplementBySupplementId,
  deleteSupplement,
  putSupplement,
  patchSupplement,
};
