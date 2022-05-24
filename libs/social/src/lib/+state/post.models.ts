import { EntityState } from '@ngrx/entity';

/**
 * Interface for the 'Post' data
 */
export interface PostEntity {
  id: string;
  author: UserEntity;
  text: string;
  createdDate: Date;
  commentCnt: number;
  likes: EntityState<LikeEntity>;
  comments: EntityState<CommentEntity>;
  selfLike: boolean;
}

export interface CommentEntity {
  id: string;
  author: UserEntity;
  text: string;
  createdDate: Date;
  likes: LikeEntity[];
  selfLike: boolean;
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
