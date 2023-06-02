import { Question } from './question';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
  count?: number;
}
