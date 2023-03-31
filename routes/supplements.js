const express = require("express");
const router = express.Router();

const supplementsDal = require("../services/pg.supplements.dal");

// SETTING UP LOGGER
const logEvents = require("../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

// Get
router.get("/", async (req, res) => {
  try {
    let theSupplements = await supplementsDal.getSupplements();
    if (DEBUG) console.table(theSupplements);

    res.render("supplements", { theSupplements });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let aSupplement = await supplementsDal.getSupplementBySupplementId(
      req.params.id
    );
    if (aSupplement.length === 0) res.render("norecord");
    else res.render("supplement", { aSupplement });
  } catch {
    res.render("503");
    myEmitter.emit(
      "log",
      "getSupplementBySupplementId()",
      "ERROR",
      "GET GAME BY GAME ID FAILED"
    );
  }
});

// Post
router.post("/", async (req, res) => {
  if (DEBUG) console.log("supplement.POST");
  try {
    await supplementsDal.addSupplement(
      req.body.id,
      req.body.name,
      req.body.use
    );
    myEmitter.emit(
      "log",
      "supplements.POST()",
      "INFO",
      "Supplement has been added to the list"
    );
    res.redirect("/supplements/");
  } catch {
    myEmitter.emit(
      "log",
      "supplement.post())",
      "ERROR",
      "POST Supplements has failed "
    );

    res.render("503");
  }
});

// Delete
router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("supplement.Delete() : " + req.params.id);
  res.render("supplementdelete.ejs", {
    name: req.query.name,
    use: req.query.use,
    theId: req.params.id,
  });
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("supplements.DELETE(): " + req.params.id);
  try {
    await supplementsDal.deleteSupplement(req.params.id);
    myEmitter.emit(
      "log",
      "supplement.Delete()",
      "INFO",
      "Supplement has been deleted from Database"
    );
    res.redirect("/supplements/");
  } catch {
    myEmitter.emit(
      "log",
      "supplements.DELETE())",
      "ERROR",
      "DELETE Supplement has failed "
    );

    res.render("503");
  }
});

//  Put
router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("supplement.Replace : " + req.params.id);
  res.render("supplementPut.ejs", {
    name: req.query.name,
    use: req.query.use,
    theId: req.params.id,
  });
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("supplements.PUT: " + req.params.id);
  try {
    await supplementsDal.putSupplement(
      req.params.id,
      req.body.name,
      req.body.use
    );
    myEmitter.emit(
      "log",
      "supplements.Replace())",
      "INFO",
      "Supplement Info Has Been Updated By PUT "
    );
    res.redirect("/supplements/");
  } catch {
    myEmitter.emit(
      "log",
      "supplements.PUT())",
      "ERROR",
      "PUT Supplement has failed "
    );
    res.render("503");
  }
});

// Patch
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("supplement.Edit : " + req.params.id);
  res.render("supplementPatch.ejs", {
    name: req.query.name,
    use: req.query.use,
    theId: req.params.id,
  });
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("supplements.PATCH: " + req.params.id);
  try {
    await supplementsDal.patchSupplement(
      req.params.id,
      req.body.name,
      req.body.name
    );
    myEmitter.emit(
      "log",
      "supplements.Edit())",
      "INFO",
      "Supplement Info Has Been Updated By PATCH "
    );
    res.redirect("/supplements/");
  } catch {
    myEmitter.emit(
      "log",
      "supplement.Edit())",
      "ERROR",
      "PATCH Supplement has failed "
    );

    res.render("503");
  }
});

module.exports = router;
