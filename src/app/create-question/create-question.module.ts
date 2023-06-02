import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuestionPageRoutingModule } from './create-question-routing.module';

import { CreateQuestionPage } from './create-question.page';
import { OptionsBuilderComponent } from './options-builder/options-builder.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateQuestionPageRoutingModule,
    UiKitModule
  ],
  declarations: [
    CreateQuestionPage,
    OptionsBuilderComponent
  ]
})
export class CreateQuestionPageModule {}
