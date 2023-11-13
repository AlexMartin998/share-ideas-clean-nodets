import { InvalidArgumentError } from '@/shared/domain';


type CommentProps = {
  id: number;
  text: string;
  userId: number;
  ideaId: number;
};


export class Comment {

  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly userId: number,
    public readonly ideaId: number
  ) {
    Comment.validate({ id, text, userId, ideaId });
  }


  static create({ id, text, userId, ideaId }: CommentProps): Comment {
    const comment = new Comment(id, text, userId, ideaId);

    ///* Domain Event

    return comment;
  }


  private static validate({ id, text, userId, ideaId }: CommentProps) {
    if (id) {
      // validate uuid
    }
    if (!text) throw new InvalidArgumentError('Text is required');
    if (text.length > 450)
      throw new InvalidArgumentError('Text has more than 450 characters');
    if (!userId) throw new InvalidArgumentError('User ID is required');
    if (!ideaId) throw new InvalidArgumentError('Idea ID is required');
  }

}
