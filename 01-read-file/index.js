const fs = require('fs');

const path = require('path');
const dirPath = path.join(__dirname, '/text.txt');
const readStream = fs.createReadStream(dirPath);

readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

readStream.on('error', (error) => {
  console.log('Reading file error:', error);
});
