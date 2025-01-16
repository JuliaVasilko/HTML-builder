const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const dirStyles = path.join(__dirname, '/styles');
  const filePath = path.join(__dirname, 'project-dist', 'bundle.css');

  const files = await fs.readdir(dirStyles, { withFileTypes: true });
  const cssFiles = files
    .filter((file) => path.extname(file.name) === '.css')
    .map((file) => fs.readFile(path.join(dirStyles, file.name)));

  Promise.all(cssFiles).then((dataArr) => fs.writeFile(filePath, dataArr));
}
mergeStyles();
