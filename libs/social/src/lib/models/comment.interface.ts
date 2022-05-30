import { User } from './user.interface';
import { Like } from './like.interface';

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdDate: Date;
  selfLike: boolean;
  likes: Like[];
  lastEdited: Date;
}
