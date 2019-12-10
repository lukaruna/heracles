const path = require('path');
const {Pact} = require('@pact-foundation/pact');
const axios = require('axios')
const {port} = require('./src/env')

global.provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'moneyFormat-consumer',
    provider: 'moneyFormat-provider',
});