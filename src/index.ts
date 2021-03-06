import { NextFunction, Request, Response, Router } from 'express';
import requireDir = require('require-dir');

export interface IRouteDef {
  active: boolean;
  chain: ((req: Request, res: Response, next: NextFunction) => void)[];
}

export abstract class BaseRoute {
  public abstract active: boolean;
  public get?: IRouteDef | undefined = undefined;
  public post?: IRouteDef | undefined = undefined;
  public put?: IRouteDef | undefined = undefined;
  public delete?: IRouteDef | undefined = undefined;
  public patch?: IRouteDef | undefined = undefined;
}

function parseKey(rawKey: string): string {
  const parsedKey = '/' + rawKey.replace(/\$/gi, ':').replace(/\./gi, '/').replace('index', '');
  return parsedKey;
}

function setupRoutes(items: any, router: Router, rootPath?: string) {
  const keys = Object.keys(items);
  let root = rootPath;
  if (!root) {
    root = '';
  }
  for (const key of keys) {
    const item = items[key];

    if (item.default) {
      const route: BaseRoute = new item.default();

      if (route.active) {
        const currentRouter = Router();
        if (route.get?.active && route.get?.chain.length > 0) {
          const parsedKey = parseKey(key);
          currentRouter.get(parsedKey, route.get?.chain);
        }

        if (route.post?.active && route.post?.chain.length > 0) {
          const parsedKey = parseKey(key);
          currentRouter.post(parsedKey, route.post?.chain);
        }

        if (route.put?.active && route.put?.chain.length > 0) {
          const parsedKey = parseKey(key);
          currentRouter.post(parsedKey, route.put?.chain);
        }

        if (route.delete?.active && route.delete?.chain.length > 0) {
          const parsedKey = parseKey(key);
          currentRouter.post(parsedKey, route.delete?.chain);
        }

        if (route.patch?.active && route.patch?.chain.length > 0) {
          const parsedKey = parseKey(key);
          currentRouter.post(parsedKey, route.patch?.chain);
        }

        router.use(root, currentRouter);
      }
    } else {
      setupRoutes(item, router, `${root}/${key}`);
    }
  }
}

export function initRoutes(options: { path: string }) {
  const router = Router();

  if (options.path) {
    const items = requireDir(options.path, { recurse: true });
    setupRoutes(items, router);
  }

  return router;
}
