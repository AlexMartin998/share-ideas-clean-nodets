export interface DeleteIdea {

  run(id: number, userId: number): Promise<boolean>;

}
