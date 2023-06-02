import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Question } from '../../core/models/question';
import { QuestionService } from '../../core/services/question.service';
import { CommonService } from '../../core/services/common.service';
import { Role } from '../../core/models/auth';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {

  @Input() question: Question;
  @Input() index: number;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  Role = Role;

  constructor(
    private alertController: AlertController,
    private readonly questionService: QuestionService,
    private readonly commonService: CommonService
  ) { }

  ngOnInit() {}

  async deleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure delete this question?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: async () => {
            const loading = await this.commonService.showLoading('Processing...');
            try {
              await this.questionService.deleteQuestion(this.question.id).toPromise();
              await this.commonService.showToast('A question has been deleted.');
              this.delete.emit();
            } catch (e) {
              await this.commonService.showToast('Error while deleting a question.');
            } finally {
              await loading.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
