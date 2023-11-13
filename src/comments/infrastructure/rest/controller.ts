import { Request, Response } from 'express';

import { CreateComment } from '@/comments/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { CommentMapper } from '../mappers';

export class CommentsController {
  constructor(private readonly commentCreator: CreateComment) {}

  create = async (req: Request, res: Response) => {
    try {
      const comment = await this.commentCreator.run({
        ...req.body,
        userId: req.body.user.id, // authMiddleware
      });

      res.status(201).json(CommentMapper.domainModelToResponseDto(comment));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).json({ error: error.message });

    if (error instanceof DomainError)
      return res.status(400).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };
}
