/**
 * Interface for the 'Social' data
 */
export interface PostEntity {
  id: string;
  author: {
    username: string;
  };
  text: string;
  createdDate: Date;
}

// export interface PostEntity {
//   id: string | number; // Primary ID
//   name: string;
// }
