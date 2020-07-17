/* eslint-disable import/no-extraneous-dependencies */
const colors = require('./colors');
const about = require('./about.json');

require('dotenv').config();

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, ANALYTICS_ID, DETERMINISTIC } = process.env

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: `${about.name} Portfolio`,
      short_name: `${about.name} Portfolio`,
      start_url: '/',
      background_color: colors.background,
      theme_color: colors.primary,
      display: 'minimal-ui',
      icon: 'media/icon.png',
    },
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
  {
    resolve: 'gatsby-source-medium',
    options: {
      username: about.mediumUser || '@medium',
    },
  },
];

if (ANALYTICS_ID) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: ANALYTICS_ID,
    },
  });
}

module.exports = {
  plugins,
  siteMetadata: {
    isMediumUserDefined: !!about.mediumUser,
    deterministicBehaviour: !!DETERMINISTIC,
  },
};
