import { User } from './user.interface';
import { Like } from './like.interface';
import { Comment } from './comment.interface';

export interface Post {
  id: string;
  author: User;
  text: string;
  createdDate: Date;
  commentCnt: number;
  likes: Like[];
  comments: Comment[];
  selfLike: boolean;
}
