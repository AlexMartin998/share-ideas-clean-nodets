import { Comment } from '@/comments/domain/models';
import { InvalidArgumentError } from '@/shared/domain';

type IdeaProps = {
  id: number;
  title: string;
  description: string;
  userId: number;
  comments: Comment[];
};

export class Idea {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly userId: number,
    public readonly comments: Comment[]
  ) {
    Idea.validate({ id, title, description, userId, comments });
  }

  static create({ id, title, description, userId, comments }: IdeaProps): Idea {
    this.validate({ id, title, description, userId, comments });

    const idea = new Idea(id, title, description, userId, comments);

    ///* Domain Event

    return idea;
  }

  private static validate({ id, title, description, userId }: IdeaProps) {
    if (id) {
      // validate uuid
    }
    if (!title) throw new InvalidArgumentError('Title is required');
    if (title.length > 45)
      throw new InvalidArgumentError('Title has more than 45 characteres');
    if (description) {
      if (description.length < 3)
        throw new InvalidArgumentError(
          'Description has less than 3 characteres'
        );
      if (description.length > 450)
        throw new InvalidArgumentError(
          'Description has more than 450 characteres'
        );
    }
    if (!userId) throw new InvalidArgumentError('User ID is required');
  }
}
