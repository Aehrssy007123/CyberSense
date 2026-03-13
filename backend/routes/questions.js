const express = require("express");
const router = express.Router();

const { db_en, db_hi } = require("../db");

router.get("/", (req, res) => {

  const lang = req.query.lang || "en";
  const db = lang === "hi" ? db_hi : db_en;

  const sql = `
    SELECT q.id,
       q.question_text,
       q.topic_id,
       q.age_group,
       q.correct_option,
       o.id AS option_id,
       o.option_text
    FROM questions q
    JOIN options o ON q.id = o.question_id
    ORDER BY q.id
`;
;


  db.query(sql, (err, rows) => {

    if (err) return res.status(500).json(err);

    const questions = {};

    rows.forEach(row => {

      if (!questions[row.id]) {
        questions[row.id] = {
          id: row.id,
          question_text: row.question_text,
          topic_id: row.topic_id,
          age_group: row.age_group,
          correct_option: row.correct_option,
          options: []
        };
      }

      questions[row.id].options.push({
  id: row.option_id,
  text: row.option_text
});

    });

    res.json(Object.values(questions));

  });

});

module.exports = router;
