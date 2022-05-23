/**
 * Interface for the 'Social' data
 */
export interface PostEntity {
  id: string;
  author: UserEntity;
  text: string;
  createdDate: Date;
  commentCnt: number;
  likes: LikeEntity[];
}

export interface LikeEntity {
  id: string; // Primary ID
  user: UserEntity;
  likeDate: Date;
}

export interface UserEntity {
  id: string; // Primary ID
  username: string;
}
