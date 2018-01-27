const cpx = require('cpx');
const fs = require('fs');

cpx.copy('LICENSE', 'dist');
cpx.copy('../README.md', '../dist');
cpx.copy('../CHANGELOG.md', '../dist');

const packageJson = JSON.parse(fs.readFileSync('package.json'));
delete packageJson['devDependencies'];
delete packageJson['scripts'];
delete packageJson['private'];
delete packageJson['standard-version'];
delete packageJson['files'];
packageJson['main'] = 'public_api.js.js';
packageJson['typings'] = 'public_api.d.ts';
fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, undefined, 2));
