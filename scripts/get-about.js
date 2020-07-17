/* eslint-disable import/no-extraneous-dependencies */
const contentful = require('contentful');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const getAboutEntry = (entry) => entry.sys.contentType.sys.id === 'about';

const main = async () => {
  const entries = await client.getEntries();
  const about = entries.items.find(getAboutEntry).fields;

  fs.writeFileSync(
    path.join(process.cwd(), 'about.json'),
    JSON.stringify(about, null, 2),
  );
};

main();
