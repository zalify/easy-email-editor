import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

let text = "";

const cwd = process.cwd();
const templateFolderPath = path.join(cwd, "/src/templates");
const states = fs.readdirSync(templateFolderPath);
const list = [];
states.forEach((item) => {
  const data = fs.readJsonSync(path.join(templateFolderPath, item));
  list.push({
    path: item,
    ..._.omit(data, "content"),
  });
  text += `
  case '${item}':
      data = (await import("@demo/templates/${item}")).default;
      break;
  `;
});

let content = `

import templates from '@demo/config/templates.json';

export async function getTemplate(id: string|number) {
  const item = templates.find(item => item.article_id === +id);
  if (!item) return null;
  let data:any = null;
  switch (item.path) {
    ${text}
  }
  return data;
}


`;

fs.writeFileSync(path.join(cwd, "src/config/getTemplate.ts"), content);
fs.writeJsonSync(path.join(cwd, "src/config/templates.json"), list);
