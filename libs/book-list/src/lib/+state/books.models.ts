export interface BooksEntity {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}
