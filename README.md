# Express Easy Routes

Provides an easy to setup routes for an express api based on a folder hierarchy.

```
/routes
    - index.ts                                      == /
    /test
        - index.ts                                  == /test
        - $id.ts                                    == /test/:id
        - $id.edit.$name.ts                         == /test/:id/edit/:name
```

## Basic example

```js
const app = express();
const { initRoutes } = require('express-easy-routes');
or;
import express from 'express';
import { initRoutes } from 'express-easy-routes';

app.use(
  '/',
  initRoutes({
    path: __dirname + '/routes',
  }),
);

//rest of initialization
```
