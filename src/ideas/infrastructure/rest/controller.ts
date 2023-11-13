import { Request, Response } from 'express';

import { CreateIdea, FindAllIdeas } from '@/ideas/domain/use-cases';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';

export class IdeasController {
  constructor(
    private readonly ideaCreator: CreateIdea,
    private readonly ideasFinder: FindAllIdeas
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const idea = await this.ideaCreator.run({ ...req.body, userId: 1 });
      res.status(201).json(idea);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const ideas = await this.ideasFinder.run();
      return res.json(ideas);
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
