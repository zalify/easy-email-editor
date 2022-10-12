import { extract, translate } from 'easy-localized-translation';
import * as fs from 'fs';

import * as dotenv from 'dotenv';

const config = dotenv.config();
async function main() {
  const words = extract({
    path: 'packages',
    keyword: 't',
    excludeDir: ['node_modules'],
    includes: ['\\*.tsx', '\\*.jsx', '\\*.ts', '\\*.js'],
  });

  const translateWords = await translate(words, {
    from: 'en',
    locales: ['zh-Hans', 'ja', 'ko', 'it'],
    servicesAccount: {
      private_key: config.parsed!.private_key!, // NEED services account
      client_email: config.parsed!.client_email!, // NEED services account
    },
  });
  fs.writeFileSync(
    'packages/easy-email-editor/public/locales.json',
    JSON.stringify(translateWords),
  );
}
main();
