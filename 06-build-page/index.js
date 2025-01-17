const fs = require('fs/promises');
const path = require('path');
const pathToProjectDist = path.join(__dirname, 'project-dist');

async function readHtml() {
  await fs.rm(pathToProjectDist, {
    recursive: true,
    force: true,
  });
  await fs.mkdir(pathToProjectDist, {
    recursive: true,
  });
  await copyDir();
  await replaceTemplate();
  await mergeStyles();
}

async function replaceTemplate() {
  const pathToTemplate = path.join(__dirname, 'template.html');

  let template = (await fs.readFile(pathToTemplate)).toString();

  const components = template
    .match(/{{\s*[^{}]+\s*}}/g)
    .map((component) => component.replace(/{{\s*([^{}]+)\s*}}/g, '$1'));

  for (const component of components) {
    const htmlOfComponent = await fs.readFile(
      path.join(__dirname, `components/${component}.html`),
    );

    template = template.replace(`{{${component}}}`, htmlOfComponent);

    await fs.writeFile(path.join(pathToProjectDist, 'index.html'), template);
  }
}

async function mergeStyles() {
  const dirStyles = path.join(__dirname, '/styles');
  const filePath = path.join(__dirname, 'project-dist', 'style.css');

  const files = await fs.readdir(dirStyles, { withFileTypes: true });
  const cssFiles = files
    .filter((file) => path.extname(file.name) === '.css')
    .map((file) => fs.readFile(path.join(dirStyles, file.name)));

  Promise.all(cssFiles).then((dataArr) => fs.writeFile(filePath, dataArr));
}

async function copyDir() {
  const pathToOriginalFiles = path.join(__dirname, '/assets');
  const dirPath = path.join(pathToProjectDist, '/assets');

  await fs.mkdir(dirPath, { recursive: true });
  await readDir(pathToOriginalFiles);
}

async function readDir(pathToDir) {
  const files = await fs.readdir(pathToDir, { withFileTypes: true });
  for (let file of files) {
    const pathToFile = path.join(pathToDir, file.name);
    const pathToNewFile = pathToFile.replace('assets', 'project-dist/assets');

    if (file.isFile()) {
      await fs.copyFile(pathToFile, pathToNewFile);
    } else {
      await fs.mkdir(pathToNewFile, { recursive: true });
      readDir(pathToFile);
    }
  }
}

readHtml();
