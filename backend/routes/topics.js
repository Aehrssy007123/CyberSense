const express = require("express");
const router = express.Router();

const { db_en, db_hi } = require("../db");

// GET topics
router.get("/", (req, res) => {

  const lang = req.query.lang || "en";

  const db = lang === "hi" ? db_hi : db_en;

  const sql = "SELECT id, topic_name, description FROM topics";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

});

module.exports = router;
