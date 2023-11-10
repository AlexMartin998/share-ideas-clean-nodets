import { Request, Response } from 'express';

import { UserRegistrator } from '@/auth/application/use-cases';
import { RoleRepository, UserRepository } from '@/auth/domain/repositories';
import { UserMapper } from '../mappers';


export class AuthController {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}


  register = async (req: Request, res: Response) => {
    try {
      const userRole = await this.roleRepository.findByName('USER_ROLE');
      const body = UserMapper.createUserDtoToDomainModel({
        ...req.body,
        role: userRole,
      });

      const user = await new UserRegistrator(this.userRepository).register(
        body
      );

      return res.status(201).json(UserMapper.domainModelToResponseDto(user));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Some Error' });
    }
  };

}
