var package = require('../../../node_modules/offshore-sql/package.json');

// Disable sequential auto-increment tests, because postgre does not behave like MySql in this case
// it does not leave gap in IDs
// var features = package['offshoreAdapter'].features;
// if(features.indexOf('autoIncrement.sequential') !== -1) {
//   features.splice(features.indexOf('autoIncrement.sequential'), 1);
// }
// NA -> Remplacer par filter pour ne pas toucher le tableau initial
var features = (package['offshoreAdapter'].features || []).filter(function(feature) {
  return feature !== 'autoIncrement.sequential';
});

module.exports = {
  name: 'offshore-sql (PostgreSql)',
  adapter: require('../../../node_modules/offshore-sql'),
  interfaces: package['offshoreAdapter'].interfaces || [],
  features: package['offshoreAdapter'].features || [],
  config: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'offshorepg',
    dbType: 'postgres'
  }
};
