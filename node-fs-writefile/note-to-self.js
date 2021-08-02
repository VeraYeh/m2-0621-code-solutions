const fs = require('fs');
const input = process.argv[2];

fs.writeFile('note.txt', input, (err) => {
  if (err) throw err;
})
