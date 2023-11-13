import { Comment } from '@/comments/domain/models';

export class CommentMapper {
  public static entityToDomainModel(object: { [key: string]: any }): Comment {
    const { id, text, userId, ideaId } = object;

    return new Comment(id, text, userId, ideaId);
  }

  // public static domainModelToResponseDto(object: {
  //   [key: string]: any;
  // }): IdeaResponseDto {
  //   const { id, title, description, userId, comments } = object;

  //   return IdeaResponseDto.create({ id, title, description, userId, comments });
  // }
}
