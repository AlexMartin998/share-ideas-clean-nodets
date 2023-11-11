export interface HandlePassword {

  hash(password: string): string;

  compare(password: string, hashed: string): boolean;

}
