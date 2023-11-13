import { Idea } from '@/ideas/domain/models';
import { IdeaResponseDto } from '../dtos';


export class IdeaMapper {

  public static entityToDomainModel(object: { [key: string]: any }): Idea {
    const { id, title, description, userId, comments } = object;

    return new Idea(id, title, description, userId, comments);
  }


  public static domainModelToResponseDto(object: {
    [key: string]: any;
  }): IdeaResponseDto {
    const { id, title, description, userId, comments } = object;

    return IdeaResponseDto.create({ id, title, description, userId, comments });
  }

}
