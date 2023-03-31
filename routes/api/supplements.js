var router = require("express").Router();
const supplementsDal = require("../../services/pg.supplements.dal");

// SETTING UP LOGGER
const logEvents = require("../../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

// api/games

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/supplements/ GET " + req.url);
  try {
    let theSupplements = await supplementsDal.getSupplements();
    res.json(theSupplements);
  } catch {
    myEmitter.emit(
      "log",
      "api/getSupplements())",
      "ERROR",
      "getSupplements API function has failed  "
    );
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/supplements/:id GET " + req.url);
  try {
    let aSupplement = await supplementsDal.getSupplementBySupplementId(
      req.params.id
    );
    if (aSupplement.length === 0) {
      myEmitter.emit(
        "log",
        "api/supplements/:id",
        "ERROR",
        "Getting By ID API Failed"
      );

      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aSupplement);
  } catch {
    myEmitter.emit(
      "log",
      "api/supplements/:id",
      "ERROR",
      "API GET FAILED USING ID PARARM"
    );
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/supplements/ POST");
  }
  try {
    await supplementsDal.addSupplement(req.body.name, req.body.use);
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    myEmitter.emit("log", "api/supplements/ POST", "ERROR", "API POST FAILED");
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/supplements PATCH " + req.params.id);
  try {
    await gamesDal.patchGame(req.params.id, req.body.name, req.body.use);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    myEmitter.emit(
      "log",
      "api/supplements/ PATCH",
      "ERROR",
      "API PATCH FAILED"
    );
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/supplements PUT " + req.params.id);
  try {
    await gamesDal.putGame(req.params.id, req.body.name, req.body.use);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    myEmitter.emit("log", "api/supplements/ PUT", "ERROR", "API Put FAILED ");
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/supplements DELETE " + req.params.id);
  try {
    await supplementsDal.deleteSupplement(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    myEmitter.emit(
      "log",
      "api/supplements/ delete",
      "ERROR",
      "SERVER ERROR 503"
    );
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

module.exports = router;
