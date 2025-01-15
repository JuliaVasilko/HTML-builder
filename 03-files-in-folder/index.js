const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, './secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(`Cannot read folder files: ${err}`);
    return;
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);

        fs.stat(filePath, (err, stats) => {
          const fileSize = stats.size;
          const [name, ext] = file.name.split('.');
          console.log(`${name} - ${ext} - ${(fileSize / 1024).toFixed(3)}kb`);
        });
      }
    });
  }
});
