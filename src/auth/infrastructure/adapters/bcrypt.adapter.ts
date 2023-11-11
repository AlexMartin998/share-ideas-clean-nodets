import { HandlePassword } from '@/auth/domain/use-cases';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


export class BcryptAdapter implements HandlePassword {

  hash(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }

  compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }

}
