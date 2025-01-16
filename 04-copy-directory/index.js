const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/files-copy');
const pathToOriginalFiles = path.join(__dirname, '/files');

function copyDir() {
  fs.rm(dirPath, { recursive: true, force: true }, (err) => {
    if (err) {
      return console.error(err.message);
    }
    fs.mkdir(dirPath, { recursive: true }, (error) => {
      if (error) return console.log(error);
      readDir(pathToOriginalFiles);
    });
  });
}

function readDir(pathToDir) {
  fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(`Cannot read folder files: ${err}`);
      return;
    } else {
      files.forEach((file) => {
        const pathToFile = path.join(pathToDir, file.name);
        const pathToNewFile = pathToFile.replace('files', 'files-copy');

        if (file.isFile()) {
          fs.copyFile(pathToFile, pathToNewFile, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('File was copied');
          });
        } else {
          fs.mkdir(pathToNewFile, { recursive: true }, (error) => {
            if (error) return console.log('second', error);
            console.log('Directory was copied');
            readDir(pathToFile);
          });
        }
      });
    }
  });
}
copyDir();
