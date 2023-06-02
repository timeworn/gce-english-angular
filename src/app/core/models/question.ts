import { Category } from './category';

export interface Question {
  id?: string;
  question: string;
  answer?: string;
  categoryId: string;
  options: string[];

  createdAt?: string;
  updatedAt?: string;
  category?: Category;
}
