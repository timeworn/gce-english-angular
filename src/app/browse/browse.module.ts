import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowsePageRoutingModule } from './browse-routing.module';

import { BrowsePage } from './browse.page';
import { QuestionCardComponent } from './quesiton-card/question-card.component';
import { AnswerPickerComponent } from './answer-picker/answer-picker.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowsePageRoutingModule,
    UiKitModule
  ],
  declarations: [
    BrowsePage,
    QuestionCardComponent,
    AnswerPickerComponent
  ]
})
export class BrowsePageModule {}
