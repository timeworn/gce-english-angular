import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) { }

  getQuestionsByCategory(categoryId, skip = 0, limit = 10): Observable<Question[]> {
    const params = new HttpParams()
      .append('category', categoryId)
      .append('skip', String(skip))
      .append('limit', String(limit));
    return this.http.get<Question[]>(`${environment.api}/questions`, {params});
  }

  getQuestionById(questionId: string): Observable<Question> {
    return this.http.get<Question>(`${environment.api}/questions/${questionId}`);
  }

  createQuestion(payload: Question): Observable<Question> {
    return this.http.post<Question>(`${environment.api}/questions`, payload);
  }

  postAnswerToQuestion(questionId: string, answer: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}/questions/${questionId}/answer`, {answer});
  }

  updateQuestion(id: string, payload: Question): Observable<Question> {
    return this.http.put<Question>(`${environment.api}/questions/${id}`, payload);
  }

  deleteQuestion(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/questions/${id}`);
  }
}
