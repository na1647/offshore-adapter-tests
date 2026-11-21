var package = require('../../../node_modules/offshore-sql/package.json');
// NA -> car les séquences ne sont pas gérées par sqlite3
var features = (package['offshoreAdapter'].features || []).filter(function(feature) {
  return feature !== 'sequences';;
});
module.exports = {
  name: 'offshore-sql (Sqlite3)',
  adapter: require('../../../node_modules/offshore-sql'),
  // sqlite3 only support one thread in writing mode so can't pass transactable tests
  interfaces: _.filter(package['offshoreAdapter'].interfaces, function(interface) {
    return interface !== 'transactable';
  }),
  features: package['offshoreAdapter'].features || [],
  config: {
    filename: './db.sqlite',
    dbType: 'sqlite3'
  },
  useNullAsDefault: true
};
