var express = require("express");
var router = express.Router();

// const PORT = process.env.PORT || 4001;

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Express" });
});

module.exports = router;
