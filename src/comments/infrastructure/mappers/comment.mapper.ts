import { Comment } from '@/comments/domain/models';
import { CommentResponseDto } from '../dtos';


export class CommentMapper {

  public static entityToDomainModel(object: { [key: string]: any }): Comment {
    const { id, text, userId, ideaId } = object;

    return new Comment(id, text, userId, ideaId);
  }

  public static domainModelToResponseDto(object: {
    [key: string]: any;
  }): CommentResponseDto {
    const { id, text, userId, ideaId } = object;

    return CommentResponseDto.create({ id, text, userId, ideaId });
  }

}
