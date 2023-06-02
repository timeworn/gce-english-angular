import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IfRoleDirective } from './directives/if-role.directive';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    IfRoleDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    IfRoleDirective,
    HeaderComponent
  ]
})
export class UiKitModule { }
