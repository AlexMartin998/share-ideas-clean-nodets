export interface DeleteComment {

  run(id: number, userId: number): Promise<boolean>;

}
