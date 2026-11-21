
module.exports = {

  create: function(Adapter, connectionName, sequenceName, cb) {
    Adapter.query(
      connectionName,
      null,
      'CREATE SEQUENCE `' + sequenceName +
        '` START WITH 1 INCREMENT BY 1',
      cb
    );
  },

  drop: function(Adapter, connectionName, sequenceName, cb) {
    Adapter.query(
      connectionName,
      null,
      'DROP SEQUENCE `' + sequenceName + '`',
      cb
    );
  }

};
