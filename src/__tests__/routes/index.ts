import { BaseRoute, IRouteDef } from '../../index';

export default class Root extends BaseRoute {
  active: boolean = true;
  get: IRouteDef = {
    active: true,
    chain: [
      async (req, res, next) => {
        return res.send({ message: 'hello from root', version: 0 });
      },
    ],
  };
}
