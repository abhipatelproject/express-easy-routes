# Express Easy Routes

![npm](https://img.shields.io/npm/v/express-easy-routes)
![GitHub](https://img.shields.io/github/license/abhipatelproject/express-easy-routes)

Provides an easy to setup routes for an express api based on a folder hierarchy.

```
/routes
    - index.ts                                      == /
    /test
        - index.ts                                  == /test
        - $id.ts                                    == /test/:id
        - $id.edit.$name.ts                         == /test/:id/edit/:name
```


Quick blog post that sheds some light into this library. 

[Learn the easy way to handle routes with Express.js](https://abhipatel.me/learn-the-easy-way-to-handle-routes-with-expressjs)


## Basic example

Each route is created as a class example of this is below
```js
/** imagine the following file (index.ts) sits at the root of /routes like such /routes/index.ts.
 *  When this file gets initialized by initRoutes it will get converted to the following.
 *  /routes/index.ts    ==    /
 *  meaning this is the root path to our API
 **/

import { BaseRoute, IRouteDef } from 'express-easy-routes';

/**
 * The BaseRoute abstract class provides public member variables that allow you to define the basic http methods that you will normally use.
 **/
export default class Root extends BaseRoute {
  //This flag is used to mark if this route is set to active, meaning it will get set up when we start our application.
  active: boolean = true;

  //The following public member variable in BaseRoute can be overridden to provide your middleware for the get HTTP method for this route and has an additional active flag for granular control over HTTP methods for each route. 
  get: IRouteDef = {
    active: true,
    //Here chain is an array of middleware
    chain: [
      async (req, res, next) => {
        return res.send({ message: 'hello from root', version: 0 });
      },
    ],
  };
}
```

```js
const express = require("express");
const { initRoutes } = require('express-easy-routes');
or;
import express from 'express';
import { initRoutes } from 'express-easy-routes';

const app = express();


//In this case my routes are in the 'routes' folder
app.use(
  '/',
  initRoutes({
    path: __dirname + '/routes',
  }),
);

//rest of initialization
```