export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: number;
  description?: string;
  copies: number;
  available?: boolean;
}
export interface BookInstanceMethods {
  updateAvailability(): Promise<IBook>;
}
