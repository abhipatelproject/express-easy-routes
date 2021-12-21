import { BaseRoute, RouteDef } from '../../index';

export default class Root extends BaseRoute {
  active: boolean = true;
  get: RouteDef = {
    active: true,
    chain: [
      async (req, res, next) => {
        return res.send({ message: 'hello from root' });
      },
    ],
  };
}
