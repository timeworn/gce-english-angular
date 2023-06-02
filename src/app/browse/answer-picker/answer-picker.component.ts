import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { QuestionService } from '../../core/services/question.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-answer-picker',
  templateUrl: './answer-picker.component.html',
  styleUrls: ['./answer-picker.component.scss'],
})
export class AnswerPickerComponent implements OnInit {

  @Input() questionId: string;
  @Input() options: string[] = [];
  @Input() answer: string;

  correct = false;
  selectedOption = null;
  groups: string[][] = [];

  constructor(
    private questionService: QuestionService,
    private commonService: CommonService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const limit = Math.ceil(this.options.length / 2);
    for (let i = 0; i < limit; i++) {
      this.groups.push([this.options[i * 2], this.options[2 * i + 1]]);
    }
  }

  async selectAnswer(item: string) {
    // TODO: check answer by calling the API, uncomment after demo
    // const loading = await this.commonService.showLoading('Checking your answer....');
    // try {
      this.selectedOption = item;
      // const res = await this.questionService.postAnswerToQuestion(this.questionId, item).toPromise();
      const alert = await this.alertController.create({
        header: this.selectedOption === this.answer ? 'Correct!' : 'Wrong!'
      });
      this.correct = this.selectedOption === this.answer;
      await alert.present();
    // } catch (e) {
    //   await this.commonService.showToast('Error while posting an answer');
    // } finally {
    //   await loading.dismiss();
    // }
  }

}
