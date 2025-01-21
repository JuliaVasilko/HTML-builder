const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '/text.txt');
const writeStream = fs.createWriteStream(dirPath);

writeStream.on('open', () => {
  console.log('Write your text: ');
});

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }

  writeStream.write(`${input}\n`);
});

process.addListener('SIGINT', () => {
  console.log('Goodbye!');
  process.exit(0);
});
