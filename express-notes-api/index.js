const express = require('express');
const app = express();
const data = require('./data.json');
let noteObj = {};
const fs = require('fs')

app.listen(3000, () => {
  console.log('Listening on port 3000!');
})

// 1) Clients can GET a list of notes.
app.get('/api/notes', (req, res) => {
  const notesArray = [];
  for (prop in data.notes) {
    notesArray.push(data.notes[prop]);
  }
  res.status(200).json(notesArray);
})

// 2) Clients can GET a single note by id.
app.get('/api/notes/:id', (req, res) => {
  const requestID = req.params.id;

  // if requested id not a positive integer
  if (isNaN(requestID) || Number(requestID) <= 0) {
    noteObj = { error: 'id must be a positive integer' };
    res.status(400).json(noteObj);
    return;
  };

  // if requested id exists in notes
  if (Number(requestID) > 0 && requestID in data.notes) {
    res.status(200).json(data.notes[requestID]);
  };

  // if there is no note with the specified id
  if (!(requestID in data.notes)) {
    noteObj = { error: `cannot find note with id ${requestID}` };
    res.status(404).json(noteObj);
  };
})

// 3) Clients can POST a new note.
app.use(express.json());

app.post('/api/notes/', (req, res) => {
  // If client does not include a content property in the request body, 400 reponse
  if (!('content' in req.body) || !(req.body['content'])) {
    noteObj = { error: 'content is a required field' };
    res.status(400).json(noteObj);
  }

  // If client includes a content property in the request body and the note is successfully recorded, 201 response
  if ('content' in req.body && (req.body['content'])) {
    noteObj = req.body;
    noteObj.id = data.nextId;
    data.notes[data.nextId] = noteObj;
    data.nextId++;
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
    // If client includes a content property in the request body and the note is not successfully recorded, 500 response
      if (err) {
        noteObj = { error: 'An unexpected error occurred' };
        res.status(500).json(noteObj);
      } else {
        res.status(201).json(noteObj);
      }
    })
  }
})

// 4) Clients can DELETE a note by id.
app.delete('/api/notes/:id', (req, res) => {
  const requestID = req.params.id;
  //If client does not specify a valid id (a positive integer), 400 response
  if (isNaN(requestID) || Number(requestID) <= 0) {
    noteObj = { error: 'id must be a positive integer' };
    res.status(400).json(noteObj);
  }

  //If specified a valid id, but the matching note does not exist, 404 response
  if (Number(requestID) > 0 && !(requestID in data.notes)) {
    noteObj = { error: `cannot find note with id ${requestID}` };
    res.status(404).json(noteObj);
  }

  //If specified a valid id and the note was successfully deleted, 204 response
  if (requestID in data.notes) {
    delete data.notes[requestID];
    //If specified a valid id, but an error occurred while writing to data.json, 500 response
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
      if (err) {
        noteObj = { error: 'An unexpected error occurred' };
        res.status(500).json(noteObj);
      } else {
        res.sendStatus(204);
      }
    })
  }
})

// 5) Clients can replace a note (PUT) by id.
app.put('/api/notes/:id', (req, res) => {
  const requestID = req.params.id;

  //If client does not specify a valid id (a positive integer) OR a content property, 400 sponse
  if (isNaN(requestID) || Number(requestID) <= 0) {
    noteObj = { error: 'id must be a positive integer' };
    res.status(400).json(noteObj);
  } else if (!('content' in req.body) || !(req.body['content'])) {
    noteObj = { error: 'content is a required field' };
    res.status(400).json(noteObj);
    return;
  }
  //If client specified a valid id and content, but the matching note does not exist, 404 response
  if (Number(requestID) > 0 && !(requestID in data.notes)) {
    noteObj = { error: `cannot find note with id ${requestID}` };
    res.status(404).json(noteObj);
  }

  //If the client specified a valid id and content, and the note was successfully updated, then they should receive a 200 response
  if (requestID in data.notes) {
    data.notes[requestID].content = req.body.content;
    noteObj = data.notes[requestID];
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
      //If client specified a valid id and content, but an error occurred while writing to data.json, 500 response
      if (err) {
        noteObj = { error: 'An unexpected error occurred' };
        res.status(500).json(noteObj);
      } else {
        res.status(200).json(noteObj);
      }
    })
  }
})
