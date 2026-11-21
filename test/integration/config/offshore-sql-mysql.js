var package = require('../../../node_modules/offshore-sql/package.json');

// NA -> car les séquences ne sont pas gérées par mysql
var features = (package['offshoreAdapter'].features || []).filter(function(feature) {
  return feature !== 'sequences';;
});

module.exports = {
  name: 'offshore-sql (Mysql)',
  adapter: require('../../../node_modules/offshore-sql'),
  interfaces: package['offshoreAdapter'].interfaces,
  features: package['offshoreAdapter'].features || [],
  config: {
    host: process.env.MYSQL_PORT_3306_TCP_ADDR || 'localhost',
    port: 3306,
    user: process.env.MYSQL_ENV_MYSQL_USER || 'root',
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD || '',
    database: process.env.MYSQL_ENV_MYSQL_DATABASE || 'offshoresql',
    dbType: 'mysql'
  }
};
