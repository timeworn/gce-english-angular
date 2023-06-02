import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/auth';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:category',
    loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-question',
    loadChildren: () => import('./create-question/create-question.module').then( m => m.CreateQuestionPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: [Role.Teacher]
    }
  },
  {
    path: 'question',
    loadChildren: () => import('./create-question/create-question.module').then( m => m.CreateQuestionPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: [Role.Teacher]
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
