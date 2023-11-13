export class CommentResponseDto {

  private constructor(
    public id: number,
    public text: string,
    public userId: number,
    public ideaId: number
  ) {}


  static create(object: { [key: string]: any }): CommentResponseDto {
    const { id, text, userId, ideaId } = object;

    return new CommentResponseDto(id, text, userId, ideaId);
  }

}
