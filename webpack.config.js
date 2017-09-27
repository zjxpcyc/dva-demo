
module.exports = (webpackConfig, env) => {
  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    models: `${__dirname}/src/models`,
    routes: `${__dirname}/src/routes`,
    svg: `${__dirname}/src/svg`
  };

  return webpackConfig;
};
