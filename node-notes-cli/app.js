const data = require('./data.json')
const fs = require('fs')

function command() {
  if (process.argv[2] === 'read') {
    for (const item in data.notes) {
      console.log(`${item}: ${data.notes[item]}`)
    }
  }
  if (process.argv[2] === 'create') {
    data.notes[data.nextId] = process.argv[3];
    data.nextId++;
  }
  if (process.argv[2] === 'delete') {
    delete data.notes[process.argv[3]];
  }
  if (process.argv[2] === 'update') {
    if (data.notes[process.argv[3]]) {
      data.notes[process.argv[3]] = process.argv[4];
    } else {
      console.log('No mathching note ID is found.')
    }

  }
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  })
}

command();
