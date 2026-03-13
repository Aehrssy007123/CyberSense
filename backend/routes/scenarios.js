const express = require("express");
const router = express.Router();

const { db_en, db_hi } = require("../db");

router.get("/", (req, res) => {

  const lang = req.query.lang || "en";
  const db = lang === "hi" ? db_hi : db_en;

  const sql = `
  SELECT s.id,
         s.title,
         s.topic_id,
         s.age_group,
         s.description,
         s.image_url,
         s.difficulty,
         a.id AS action_id,
         a.action_text,
         a.result,
         a.explanation
  FROM scenarios s
  JOIN scenario_actions a
  ON s.id = a.scenario_id
  ORDER BY s.id
  `;

  db.query(sql, (err, rows) => {

    if (err) return res.status(500).json(err);

    const scenarios = {};

    rows.forEach(row => {

      if (!scenarios[row.id]) {
        scenarios[row.id] = {
          id: row.id,
          title: row.title,
          topic_id: row.topic_id,
          age_group: row.age_group,
          description: row.description,
          image_url: row.image_url,
          difficulty: row.difficulty,
          actions: []
        };
      }

      scenarios[row.id].actions.push({
        id: row.action_id,
        action_text: row.action_text,
        result: row.result,
        explanation: row.explanation
      });

    });

    res.json(Object.values(scenarios));

  });

});

module.exports = router;
