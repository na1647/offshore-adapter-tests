
var assert = require('assert');
var _ = require('lodash');

describe('Sequences feature', function() {

  var connectionName = 'sequencesTest';
  var sequenceName = 'OFFSHORE_ADAPTER_TEST_SEQ';
  var sequenceCreated = false;
  var sequenceSupport;

  before(function(done) {
    var connection = _.clone(Connections.test);
    connection.identity = connectionName;

    try {
      sequenceSupport = require('./support/' + connection.dbType);
    } catch (err) {
      return done(new Error(
        'Sequence tests are not configured for ' + connection.dbType
      ));
    }

    Adapter.registerConnection(connection, {}, function(err) {
      if (err) return done(err);

      sequenceSupport.create(
        Adapter,
        connectionName,
        sequenceName,
        function(err) {
          if (err) return done(err);

          sequenceCreated = true;
          done();
        }
      );
    });
  });

  after(function(done) {
    function teardown(err) {
      Adapter.teardown(connectionName, function(teardownErr) {
        done(err || teardownErr);
      });
    }

    if (!sequenceCreated) {
      return teardown();
    }

    sequenceSupport.drop(
      Adapter,
      connectionName,
      sequenceName,
      teardown
    );
  });

  describe('getNextSequence', function() {

    it('should return the next sequence value', function(done) {
      Adapter.getNextSequence(
        connectionName,
        sequenceName,
        function(err, value) {
          assert.ifError(err);
          assert.strictEqual(typeof value, 'string');
          assert(Number(value) > 0);
          done();
        }
      );
    });

    it('should return increasing sequence values', function(done) {
      Adapter.getNextSequence(
        connectionName,
        sequenceName,
        function(err, firstValue) {
          if (err) return done(err);

          Adapter.getNextSequence(
            connectionName,
            sequenceName,
            function(err, secondValue) {
              if (err) return done(err);

              assert(Number(secondValue) > Number(firstValue));
              done();
            }
          );
        }
      );
    });

    it('should return an error for an unknown sequence', function(done) {
      Adapter.getNextSequence(
        connectionName,
        'OFFSHORE_UNKNOWN_SEQUENCE',
        function(err, value) {
          assert(err);
          assert.strictEqual(value, undefined);
          done();
        }
      );
    });

  });

});
