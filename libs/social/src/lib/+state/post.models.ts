import { EntityState } from '@ngrx/entity';
import { NewsPostVisiblity } from '../models';

/**
 * Interface for the 'Post' data
 */
export interface PostEntity {
  id: string;
  author: UserEntity;
  text: string;
  visibility: NewsPostVisiblity;
  createdDate: Date;
  commentCnt: number;
  likes: LikeEntity[];
  comments: EntityState<CommentEntity>;
  selfLike: boolean;
  assetTags: AssetTagEntity[];
  hashTags: HashTagEntity[];
  mentions: UserEntity[];
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

export interface AssetTagEntity {
  id: string; // Primary ID
  symbol: string; // The unique symbol key of the assets
  name: string; // The name of the asset as given by the banking service
  logo: string; // The referenced logo (image of the asset as given by the banking service)
  active: boolean; // The status of the asset (@TODO: To be implemented when inactivated)
  createdDate: Date; // The creation date of the tag
}

export interface HashTagEntity {
  id: string; // Primary ID
  name: string;
}
