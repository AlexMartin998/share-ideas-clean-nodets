import { Nullable } from '@/shared/domain';
import { Role } from '../models/role';


export interface RoleRepository {

  findByName(name: string): Promise<Nullable<Role>>;

}
