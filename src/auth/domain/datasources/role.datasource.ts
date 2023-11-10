import { Nullable } from '@/shared/domain';
import { Role } from '../models/role';


export interface RoleDatasource {

  findByName(name: string): Promise<Nullable<Role>>;

}
