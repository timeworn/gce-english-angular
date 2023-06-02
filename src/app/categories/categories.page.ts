import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category';
import { CommonService } from '../core/services/common.service';
import { Role } from '../core/models/auth';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Category[] = [];

  Role = Role;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly commonService: CommonService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllCategories();
  }

  async getAllCategories() {
    const loading = await this.commonService.showLoading('Loading categories...');
    try {
      this.categories = await this.categoryService.getAllCategories().toPromise();
    } catch (e) {
      await this.commonService.showToast('Error while loading categories.');
    } finally {
      await loading.dismiss();
    }
  }

}
