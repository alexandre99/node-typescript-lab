import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return new Promise<string>(resolve => resolve(payload));
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return new Promise<boolean>(resolve => resolve(payload === hashed));
  }
}
