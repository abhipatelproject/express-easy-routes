import { initRoutes } from '../../src/index';
import express = require('express');
const listEndpoints = require('express-list-endpoints');

describe('sample test', () => {
  it('hello world', () => {
    expect('hello world').toBe('hello world');
  });
  it('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('express easy routes test', () => {
  it('print all routes', () => {
    const app = express();

    app.use(
      '/',
      initRoutes({
        path: __dirname + '/routes',
      }),
    );

    console.log(__dirname + '/routes');
    console.log('routes', listEndpoints(app));
  });
});
