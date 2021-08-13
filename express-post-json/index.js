const express = require('express');
const app = express();
let nextId = 1;
let grades = {};
const gradesArr = [];

app.listen(3000, () => {
  console.log('Listening on port 3000!');
})

app.get('/api/grades', function(req, res) {
  res.json(gradesArr);
})

app.use(express.json());

app.post('/api/grades', function(req, res) {
  res.status(201);
  grades = req.body;
  grades.id = nextId;
  res.json(grades);
  gradesArr.push(grades);
  nextId++;
})
