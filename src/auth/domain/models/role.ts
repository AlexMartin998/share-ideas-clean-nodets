import { InvalidArgumentError } from '@/shared/domain/errors';


export class Role {

  constructor(public readonly id: number, public readonly name: string) {}

  static create(id: number, name: string) {
    this.validate(id, name);
    return new Role(id, name);
  }

  private static validate(id: number, name: string) {
    if (!id) throw new InvalidArgumentError('Id is required');
    if (!name) throw new InvalidArgumentError('Name is required');
  }

}
