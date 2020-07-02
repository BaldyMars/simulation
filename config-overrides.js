// module.exports = function (config, env) {
//   return config;
// }

const { override, addDecoratorsLegacy, fixBabelImports, addLessLoader } = require("customize-cra");
const modifyVars = require("./tieme")
module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
      javascriptEnabled: true,
      modifyVars
     })
)