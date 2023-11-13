import { Idea } from '@/ideas/domain/models';

export class IdeaMapper {
  public static entityToDomainModel(object: { [key: string]: any }): Idea {
    const { id, title, description, userId, comments } = object;

    return new Idea(id, title, description, userId, comments);
  }

  // public static domainModelToResponseDto(object: {
  //   [key: string]: any;
  // }): UserResponseDto {
  //   const { user, token } = object;

  //   return UserResponseDto.create({ user, token });
  // }
}
