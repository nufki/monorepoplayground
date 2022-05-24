import { User } from './user.interface';

export interface Like {
  id: string; // Primary ID
  user: User;
  likeDate: Date;
}
