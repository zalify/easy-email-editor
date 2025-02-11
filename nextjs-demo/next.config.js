const path = require('path');
const withLess = require('next-with-less');

module.exports = withLess((phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    resolve: {
      alias: {},
    },
  };
  config.resolve.alias['@/client'] = path.resolve(__dirname, './src/client');
  config.resolve.alias['react'] = path.resolve('./node_modules/react');
  config.resolve.alias['react-dom'] = path.resolve('./node_modules/react-dom');
  config.resolve.alias['@arco-design/web-react'] = path.resolve(
    './node_modules/@arco-design/web-react',
  );
  return config;
});
