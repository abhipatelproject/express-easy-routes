import { Router, NextFunction, Request, Response } from 'express';
import requireDir = require('require-dir');

export type RouteDef = {
  active: boolean;
  chain: ((req: Request, res: Response, next: NextFunction) => void)[];
};

export abstract class BaseRoute {
  abstract active: boolean;
  get?: RouteDef | undefined = undefined;
  post?: RouteDef | undefined = undefined;
  put?: RouteDef | undefined = undefined;
  delete?: RouteDef | undefined = undefined;
  patch?: RouteDef | undefined = undefined;
}

function parseKey(rawKey: string): string {
  const parsedKey = '/' + rawKey.replace(/\$/gi, ':').replace(/\./gi, '/').replace('index', '');
  return parsedKey;
}

function setupRoutes(items: any, router: Router, rootPath: string | undefined = undefined) {
  const keys = Object.keys(items);
  let root = rootPath;
  if (!root) {
    root = '/';
  }
  for (const key of keys) {
    const item = items[key];

    if (item.default) {
      const route: BaseRoute = new item.default();

      if (route.active) {
        const currentRouter = Router();
        if (route.get?.active) {
          const parsedKey = parseKey(key);
          currentRouter.get(parsedKey, route.get?.chain);
        }

        router.use(root, currentRouter);
      }
    } else {
      setupRoutes(item, router, `/${key}`);
    }
  }
}

export function initRoutes(
  options: {
    path: string;
  } = {
    path: './routes',
  },
) {
  const router = Router();

  try {
    if (options.path) {
      let items = requireDir(options.path, { recurse: true });
      setupRoutes(items, router);
    }
  } catch (err) {
    console.log('routes could not be initialized');
  }

  return router;
}
