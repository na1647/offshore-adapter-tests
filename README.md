# Offshore Adapter Tests

Integration test suite for Offshore adapters.

This package provides a set of integration tests that can be included in an Offshore adapter module to validate adapter compatibility with the Offshore API.

**Current version:** 1.2.0

![npm version](https://badge.fury.io/js/%40na1647%2Foffshore-adapter-tests.svg)

## Project History and Maintainers

This project is derived from the original **offshore-adapter-tests** repository created by **Alexandre Tiertant**.

The original Git history and authorship have been preserved.

Current maintenance and development are handled by **Nicolas A.**

### Original author
- **lexandre Tiertant**
- GitHub: @atiertant
- Original project: Atlantis-Software/offshore-adapter-tests
Current maintainer
- **Nicolas A.**
- GitHub: @na1647
- Repository: na1647/offshore-adapter-tests

### Current developments

Version 1.2.0 includes:

- Support for database sequences.
- MariaDB adapter integration test configuration.
- Updates to the SQL adapter integration test configurations.

## Installation

Install the package using npm:

bash
npm install --save-dev @na1647/offshore-adapter-tests

## Adapter Interface Specification

The test suite validates the interfaces implemented by an Offshore adapter.

## Usage

### Write a test runner

For example, create a runner.js file:

javascript
/**
 * Test runner dependencies
 */
var mocha = require('mocha');
var TestRunner = require('@na1647/offshore-adapter-tests');

/**
 * Integration Test Runner
 *
 * Uses the offshore-adapter-tests module to
 * run mocha tests against the specified interfaces
 * of the currently implemented Offshore adapter API.
 */
new TestRunner({

    // Load the adapter module.
    adapter: require('./relative/path/to/your/adapter'),

    // Default adapter configuration.
    config: {
        schema: false
    },

    // Interfaces to test.
    interfaces: ['semantic', 'queryable']
});

Run the tests
bash
node runner.js

### Running Tests in a Vagrant VM

Since it is not necessarily desirable to install all supported databases on the local host, a Vagrant configuration for a fully configured virtual machine is provided.

To run the tests using this virtual machine, follow the instructions in the Vagrant documentation.

Using Vagrant is entirely optional. If you prefer to run the tests directly on your host, make sure that the databases required by your tests are installed and configured.

## License

This project is distributed under the MIT License.

See LICENSE.md.

Original copyright and licensing notices are preserved.