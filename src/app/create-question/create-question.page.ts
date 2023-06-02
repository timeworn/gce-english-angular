import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category';
import { CommonService } from '../core/services/common.service';
import { QuestionService } from '../core/services/question.service';
import { Question } from '../core/models/question';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.page.html',
  styleUrls: ['./create-question.page.scss'],
})
export class CreateQuestionPage implements OnInit {

  form: FormGroup = this.initForm();

  questionId = null;
  isCategoryLoading = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly commonService: CommonService,
    private readonly questionService: QuestionService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.questionId = this.route.snapshot.params.id;
    await this.loadCategories();
    if (this.questionId) {
      this.loadQuestion();
    }
  }

  private initForm(question: Question = null) {
    const data: any = question ? question : {category: {}};
    return this.fb.group({
      question: [data.question || '', Validators.required],
      options: [data.options || [], Validators.required],
      answer: [data.answer || '', Validators.required],
      categoryId: [data.category.id || '', Validators.required]
    });
  }

  async loadQuestion() {
    const loading = await this.commonService.showLoading('Loading question...');
    try {
      const question = await this.questionService.getQuestionById(this.questionId).toPromise();
      this.form = this.initForm(question);
    } catch (e) {
      await this.commonService.showToast('Error while fetching question detail.');
    } finally {
      await loading.dismiss();
    }
  }

  async loadCategories() {
    try {
      this.isCategoryLoading = true;
      this.categories = await this.categoryService.getAllCategories().toPromise();
    } catch (e) {
      await this.commonService.showToast('Error while loading categories.');
    } finally {
      this.isCategoryLoading = false;
    }
  }

  async save() {
    const loading = await this.commonService.showLoading('Saving...');
    try {
      const data = this.form.value;
      // custom validation checker
      if (!data.options.find(x => x === data.answer)) {
        await this.commonService.showToast('Please include valid answer to options.');
        return;
      }
      const invalidOptions = data.options.filter(x => !x);
      if (invalidOptions && invalidOptions.length > 0) {
        await this.commonService.showToast('Options are required. Or remove them if they are not necessary.');
        return;
      }
      if (!data.options || data.options.length < 4) {
        await this.commonService.showToast('At least 4 options should be provided.');
        return;
      }
      // save question
      if (this.questionId) {
        const res = await this.questionService.updateQuestion(this.questionId, this.form.value).toPromise();
        await this.router.navigate([`/category/${res.categoryId}`]);
      } else {
        await this.questionService.createQuestion(this.form.value).toPromise();
        await this.router.navigate(['/categories']);
      }
    } catch (e) {
      await this.commonService.showToast('Error while saving a question.');
    } finally {
      await loading.dismiss();
    }

  }

}
