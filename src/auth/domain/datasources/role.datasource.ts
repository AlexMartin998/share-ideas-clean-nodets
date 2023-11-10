import { Role } from '../models/role';


export interface RoleDatasource {

  findByName(name: string): Promise<Role>;

}
