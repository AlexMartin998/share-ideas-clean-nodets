import { envs } from '../src/shared/insfrastructure/config/envs';
import { Server } from '../src/shared/insfrastructure/server/server';

// // vamos a mocker todo el Server | tb util para mockear librerias externas (react)
jest.mock('../src/shared/insfrastructure/server/server.ts');



describe('[App]: Test suit', () => {

  it('it should work', async () => {
    await import('../src/main');

    expect(Server).toHaveReturnedTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      router: expect.any(Function)
    });

    expect(Server.prototype.start).toHaveBeenCalledWith();
  });

});
