import { Comment } from '@/comments/domain/models';


export class IdeaResponseDto {

  private constructor(
    public id: number,
    public title: string,
    public description: string,
    public userId: number,
    public comments: Comment[]
  ) {}


  static create(object: { [key: string]: any }): IdeaResponseDto {
    const { id, title, description, userId, comments } = object;

    return new IdeaResponseDto(id, title, description, userId, comments);
  }

}
