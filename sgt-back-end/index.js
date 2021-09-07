var express = require('express');
var app = express();
const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.listen(3000, () => {
  console.log('Express server is listening on port 3000.')
});

// example route for GETing a grade by its gradeId
app.get('/api/grades/:gradeId', (req, res, next) => {

  const gradeId = parseInt(req.params.gradeId, 10);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
    return;
  }

  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
     where "gradeId" = $1
  `;

  const params = [gradeId];

  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
})

//1) GET /api/grades, returns all rows from the "grades" table.
//   200 OK or a 500 error response.

app.get('/api/grades', (req, res) => {

  const sql = `
    select *
      from "grades"
  `;

  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.status(200).json(grade);
    })

    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      })
    })
  })

//2) POST /api/grades inserts a new grade into the "grades" table and returns the created grade.
//   The client should receive an object, not an array.
//   The result could be a 201, 400, or 500.
app.use(express.json());

app.post('/api/grades', (req, res) => {

  const body = req.body;

  for (const prop in body) {
    if (!(body[prop])) {
      res.status(400).json({
        error: 'request error, missing values of name, course, or score'
      });
      return;
    }
  }

  if (!('name' in body) || !('course' in body) || !('score' in body)) {
    res.status(400).json({
      error: 'request error, invalid/missing name, course, or score'
    });
    return;
  }

  const score = Number(body.score);
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    res.status(400).json({
      error: 'request error, invalid score'
    });
    return;
  }

  const columns = `insert into "grades" ("name", "course", "score") values($1, $2, $3) returning *`;
  const values = [body.name, body.course, body.score];

  db.query(columns, values)
    .then(result => {
      const table = result.rows[0];
      res.status(201).json(table);
    })

    .catch(err => {
      res.status(500).json({
        error: 'An unexpected error occured.'
      })
    })
})

//3) PUT /api/grades/:gradeId updates a grade in the "grades" table and returns the updated grade.
//   The result could be a 200, 400, 404, or 500.

app.put('/api/grades/:gradeId', (req, res) => {

  const gradeId = Number(req.params.gradeId);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'gradeId must be a positive integer'
    })
    return;
  }

  const body = req.body;
  const score = body.score;
  const name = body.name;
  const course = body.course;


  if (!('name' in body) || !('course' in body) || !('score' in body)) {
    res.status(400).json({
      error: 'request error, invalid/missing name, course, or score'
    })
    return;
  }

  const score1 = Number(body.score);
  if (!Number.isInteger(score1) || score1 < 0 || score1 > 100) {
    res.status(400).json({
      error: 'request error, invalid score'
    });
    return;
  }

  const update = `UPDATE "grades" SET "name" = $1, "course" = $2, "score" = $3 WHERE "gradeId" = $4 RETURNING *`;
  const values = [name, course, score, gradeId];

  db.query(update, values)
    .then(result => {
      const table = result.rows[0];
      if (!table) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        })
      } else {
        res.status(200).json(table);
      }
    })

    .catch(err => {
      res.status(500).json({
        error: 'An unexpected error occured.'
      })
    })
})

// 4) DELETE /api/grades/:gradeId deletes a grade from the "grades" table.
//    The result could be a 204, 400, 404, or 500.

app.delete('/api/grades/:gradeId', (req, res) => {

  const gradeId = Number(req.params.gradeId);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'gradeId must be a positive integer'
    })
    return;
  }

  const deleteSql = `DELETE FROM "grades" WHERE "gradeId" = $1 RETURNING *`;
  const params = [gradeId];

  db.query(deleteSql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'An unexpected error occured.'
      })
    })
})
