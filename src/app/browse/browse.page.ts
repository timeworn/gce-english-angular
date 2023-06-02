import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../core/services/question.service';
import { Question } from '../core/models/question';
import { CommonService } from '../core/services/common.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  category;
  questions: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private commonService: CommonService
  ) {
    this.category = this.route.snapshot.params.category;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loading = await this.commonService.showLoading('Loading questions...');
    try {
      await this.loadQuestions(this.questions.length);
    } catch (e) {
      await this.commonService.showToast('Error while fetching questions.');
    } finally {
      await loading.dismiss();
    }
  }

  async loadMore(e) {
    await this.loadQuestions(this.questions.length);
    e.target.complete();
  }

  async loadQuestions(skip) {
    try {
      this.isLoading = true;
      const res = await this.questionService.getQuestionsByCategory(this.category, skip).toPromise();
      this.questions = this.questions.concat(...res);
    } catch (e) {
      await this.commonService.showToast('Error while fetching questions.');
    } finally {
      this.isLoading = false;
    }
  }

  removeItemFromList(index) {
    this.questions.splice(index, 1);
  }

}
