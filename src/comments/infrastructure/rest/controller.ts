import { Request, Response } from 'express';

import {
  CreateComment,
  DeleteComment,
  FindComment,
  FindComments,
} from '@/comments/domain/use-cases';
import { UpdateIdea } from '@/ideas/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { CommentMapper } from '../mappers';

export class CommentsController {
  constructor(
    private readonly commentCreator: CreateComment,
    private readonly commentsFinder: FindComments,
    private readonly commentFinder: FindComment,
    private readonly commentUpdater: UpdateIdea,
    private readonly commentDeleter: DeleteComment
  ) {}

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

  findAll = async (_req: Request, res: Response) => {
    try {
      const comments = await this.commentsFinder.run();
      return res.json(comments.map(CommentMapper.domainModelToResponseDto));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const comment = await this.commentFinder.run(+id);
      return res
        .status(200)
        .json(CommentMapper.domainModelToResponseDto(comment));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const updatedComment = await this.commentUpdater.run(+id, {
        ...req.body,
        userId: req.body.user.id,
      });

      return res
        .status(200)
        .json(CommentMapper.domainModelToResponseDto(updatedComment));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.commentDeleter.run(+id, +req.body.user.id);

      res.status(204).send();
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
