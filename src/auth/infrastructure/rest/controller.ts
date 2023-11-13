import { Request, Response } from 'express';

import { JwtConstants } from '@/auth/application/constants';
import { UnauthorizedError } from '@/auth/domain/errors';
import { HandleAuthToken, LoginDto, LoginUser, RegisterUser } from '@/auth/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { UserMapper } from '../mappers';


export class AuthController {

  ///* DI
  constructor(
    private readonly userRegistrator: RegisterUser,
    private readonly userLogin: LoginUser,
    private readonly authTokenHandler: HandleAuthToken,
  ) {}


  register = async (req: Request, res: Response) => {
    try {
      const userToken = await this.userRegistrator.run(req.body);

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginDto = LoginDto.create(req.body);

      const userToken = await this.userLogin.run(loginDto);

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  renewJwt = async (req: Request, res: Response) => {
    try {
      const { authUser } = req.body;
      if (!authUser) throw new UnauthorizedError('Invalid token');

      const token = await this.authTokenHandler.generateToken(
        { id: authUser.id },
        JwtConstants.duration
      );
      if (!token) throw new Error('Something went wrong while creating JWT');

      const userMapped = UserMapper.domainModelToResponseDto({
        user: authUser,
        token,
      });
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
