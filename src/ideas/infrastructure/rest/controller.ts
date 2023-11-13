import { Request, Response } from 'express';

import {
  CreateIdea,
  DeleteIdea,
  FindAllIdeas,
  FindIdea,
  UpdateIdea,
} from '@/ideas/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { IdeaMapper } from '../mappers';

export class IdeasController {
  constructor(
    private readonly ideaCreator: CreateIdea,
    private readonly ideasFinder: FindAllIdeas,
    private readonly ideaFinder: FindIdea,
    private readonly ideaDeleter: DeleteIdea,
    private readonly ideaUpdater: UpdateIdea
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const idea = await this.ideaCreator.run({
        ...req.body,
        userId: req.body.user.id, // authMiddleware
      });
      res.status(201).json(IdeaMapper.domainModelToResponseDto(idea));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const ideas = await this.ideasFinder.run();
      return res.json(ideas.map(IdeaMapper.domainModelToResponseDto));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const idea = await this.ideaFinder.run(+id);
      return res.status(200).json(IdeaMapper.domainModelToResponseDto(idea));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const updatedIdea = await this.ideaUpdater.run(+id, {
        ...req.body,
        userId: req.body.user.id,
      });

      return res
        .status(200)
        .json(IdeaMapper.domainModelToResponseDto(updatedIdea));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.ideaDeleter.run(+id, +req.body.user.id);

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
