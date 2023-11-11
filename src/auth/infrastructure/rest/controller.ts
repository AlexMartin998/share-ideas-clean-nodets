import { Request, Response } from 'express';

import { UserLogin, UserRegistrator } from '@/auth/application/use-cases';
import { UnauthorizedError } from '@/auth/domain/errors';
import { RoleRepository, UserRepository } from '@/auth/domain/repositories';
import { LoginDto } from '@/auth/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { BcryptAdapter, JwtAdapter } from '../adapters';
import { UserMapper } from '../mappers';

export class AuthController {
  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const userToken = await new UserRegistrator(
        this.userRepository,
        this.roleRepository,
        new JwtAdapter(),
        new BcryptAdapter()
      ).run(req.body);

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginDto = LoginDto.create(req.body);

      const userToken = await new UserLogin(
        this.userRepository,
        new JwtAdapter(),
        new BcryptAdapter()
      ).run(loginDto);

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof UnauthorizedError)
      return res.status(401).json({ error: error.message });
    if (error instanceof ResourceNotFoundError)
      return res.status(404).json({ error: error.message });

    if (error instanceof DomainError)
      return res.status(400).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };
}
