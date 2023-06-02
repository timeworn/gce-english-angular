import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQuestionPage } from './create-question.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQuestionPage
  },
  {
    path: ':id',
    component: CreateQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuestionPageRoutingModule {}
