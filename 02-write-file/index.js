const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '/text.txt');
const writeStream = fs.createWriteStream(dirPath);

writeStream.on('open', () => {
  console.log('Write your text: ');
});
writeStream.on('data', (chunk) => {
  writeStream.write(chunk);
});

process.stdin.pipe(writeStream);
