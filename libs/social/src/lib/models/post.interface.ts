import { HashTag } from './hashtag.interface';
import { User } from './user.interface';
import { Like } from './like.interface';
import { Comment } from './comment.interface';
import { AssetTag } from './assettag.interface';

/***************************************************************************
 * Post visibility types
 ***************************************************************************/
export enum NewsPostVisiblity {
  FRIENDS = 'FRIENDS',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  COMMUNITY = 'COMMUNITY',
}

export interface Post {
  id: string;
  author: User;
  text: string;
  visibility: NewsPostVisiblity;
  createdDate: Date;
  commentCnt: number;
  likes: Like[];
  comments: Comment[];
  selfLike: boolean;
  assetTags: AssetTag[];
  hashTags: HashTag[];
  mentions: User[];
}
