const fs = require('fs');
const Handlebars = require('handlebars');
const { $$readFileSync } = require('./scripts/site/utils/file-create');


const root = 'C:\\Users\\zhichao.ren\\Downloads\\Javascript\\入门';
const dir = fs.readdirSync(root);

const files = [];
dir.forEach(dirName => {
  const childDir = fs.readdirSync(`${root}\\${dirName}`);
  files.push(...childDir.filter(fileName => fileName.endsWith('.html')).map(file => `${root}\\${dirName}\\${file}`));
})

// const template = 
// `import { Component } from "@angular/core";

// @Component({
//   selector: '{{selector}}',
//   templateUrl: './{{name}}.html'
// })
// export class {{name}} {

// }
// `;

// const templateModule =
// `import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// {{#each declarations}}
// import { {{this}} } from './{{this}}';
// {{/each}}

// @NgModule({
//   declarations: [
//     {{#each declarations}}
//     {{this}},
//     {{/each}}
//   ],
//   imports: [
//     RouterModule.forChild([
//       {{#each declarations}}
//       { path: '{{this}}', component: {{this}} },
//       {{/each}}
//     ])
//   ],
//   providers: [],
// })
// export class StudyModule { }
// `;

// const routes = [];
// const filePath = './scripts/site/_site/doc/app/study'
// const assetsPath = './scripts/site/_site/doc/assets'
// const declarations = [];
// const obj = Handlebars.compile(template);
const template = 
`server {
  listen 808{{index}};
  server_name localhost;
  
  location / { 
          root html;
          index '{{name}}';
  }
}
`

files.forEach((file, index) => {
  const html = fs.readFileSync(file, 'utf8');
  const name = file.substring(file.lastIndexOf('\\') + 1);
  const map = {index, name};
  $$readFileSync(`C:/Users/zhichao.ren/Desktop/nginx-1.18.0/html/${file.substring(file.lastIndexOf('\\') + 1)}`, html);
  $$readFileSync(`C:/Users/zhichao.ren/Desktop/nginx-1.18.0/html/config/conf${index}.conf`, Handlebars.compile(template)(map))
})
