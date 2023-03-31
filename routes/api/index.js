var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/supplements");
}
// http://localhost:3000/api/actors/
const supplementsRouter = require("./supplements");
router.use("/supplements", supplementsRouter);

module.exports = router;
